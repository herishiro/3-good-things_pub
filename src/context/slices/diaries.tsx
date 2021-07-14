import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "context/reduxStore";
import { format, sub } from "date-fns";
import { Diary } from "interfaces";
import {
	getDividedDiariesByMonth,
	addEmptyDiaries,
	removeEmptyDiaries,
	flattenToDiaries,
	getFilledEventCount,
	checkDiaryIfAfterPeriod,
	sortByDiaryData,
} from "libs/diaries";
import {
	getDiaries,
	getDiariesByMonth,
	getDiary,
	getMoreDiaries,
	getOldestDiary,
	setDiaries,
} from "libs/firebase/db";
import { selectDiary } from "./diary";

export interface InitialState {
	props: {
		dividedDiariesByMonth: Diary[][];
		selectedPeriod: string;
		lastDate: number | null;
		updatedDiaries: Diary[];
		initialDiaries: Diary[];
		status: string;
		error: string | undefined;
		hasMore: boolean;
		oldestDiary: Diary | null;
		successiveDaysCount: number;
	};
}
const initialState: InitialState = {
	props: {
		dividedDiariesByMonth: [],
		selectedPeriod: "all",
		lastDate: null,
		updatedDiaries: [],
		initialDiaries: [],
		status: "idle",
		error: "",
		hasMore: true,
		oldestDiary: null,
		successiveDaysCount: 0,
	},
};

interface FetchPayload {
	userId: string;
	howMany: number;
}
export const fetchDiaries = createAsyncThunk(
	"diaries/fetchDiaries",
	async ({ userId, howMany }: FetchPayload) => {
		const diaries = await getDiaries({ howMany, userId });
		return diaries;
	}
);

export const fetchOldestDiary = createAsyncThunk(
	"diaries/fetchOldestDiary",
	async ({ userId }: { userId: string }) => {
		const oldestDiary = await getOldestDiary({ userId });
		return oldestDiary;
	}
);

interface FetchMonthPayload {
	selectedValue: string;
	userId: string;
}
export const fetchDiariesInMonth = createAsyncThunk(
	"diaries/fetchDiariesByMonth",
	async ({ selectedValue, userId }: FetchMonthPayload) => {
		const [year, month] = selectedValue.split("/");
		const diariesInMonth = await getDiariesByMonth({
			year: Number(year),
			month: Number(month),
			userId,
		});
		return { diariesInMonth, year, month, selectedValue };
	}
);
interface FetchMorePayload {
	howMany: number;
	userId: string;
}
export const fetchMoreDiaries = createAsyncThunk(
	"diaries/fetchMoreDiaries",
	async (payload: FetchMorePayload, { getState }) => {
		const { howMany, userId } = payload;
		const lastDate = selectLastDate(getState() as RootState);
		const devidedDiaries = selectDevidedDiaries(getState() as RootState);
		if (!lastDate) return;
		if (devidedDiaries.length && !lastDate) {
			throw new Error("there are diaries but no last date");
		}
		const nextDiaries = await getMoreDiaries({
			howMany,
			lastDate,
			userId,
		});
		return { nextDiaries };
	}
);

export const fetchSuccessiveDaysCount = createAsyncThunk(
	"diaries/fetchSuccessiveDaysCount",
	async (payload: { userId: string }) => {
		const { userId } = payload;
		let daysCount = 0;
		let subDays = 1;
		const todayId = await format(new Date(), "yyyy-MM-dd");
		const todayDiary = await getDiary({ userId, diaryId: todayId });
		if (todayDiary) daysCount++;
		const yesterdayId = await format(
			sub(new Date(), { days: 1 }),
			"yyyy-MM-dd"
		);
		const yesterdayDiary = await getDiary({ userId, diaryId: yesterdayId });
		if (yesterdayDiary) daysCount++;
		let currentDiary = yesterdayDiary;
		while (currentDiary || daysCount > 30) {
			subDays++;
			const currentId = await format(
				sub(new Date(), { days: subDays }),
				"yyyy-MM-dd"
			);
			currentDiary = await getDiary({ userId, diaryId: currentId });
			if (currentDiary) daysCount++;
		}
		return { daysCount };
	}
);

export const setDiaryInDiaries = createAsyncThunk(
	"diaries/setDiaryInDiaries",
	async (_: any, { getState }) => {
		const diary = selectDiary(getState() as RootState);
		return diary;
	}
);

type setProps = {
	userId: string;
	diaries: Diary[];
};
export const setDiariesToDB = createAsyncThunk(
	"diaries/setDiariesToDB",
	async ({ userId, diaries }: setProps) => {
		await setDiaries({ userId, diaries });
		return diaries;
	}
);

interface updatePayload {
	diaries: Diary[];
	init?: boolean;
	year?: string;
	month?: string;
}
export const diariesSlice = createSlice({
	name: "diaries",
	initialState,
	reducers: {
		initDiariesState(state, action: PayloadAction<InitialState | undefined>) {
			if (!action.payload) {
				state.props = initialState.props;
			} else {
				state.props = action.payload.props;
			}
		},
		updateSource(state, action: PayloadAction<updatePayload>) {
			const { diaries } = action.payload;
			const newDiveidedDiaries = getDividedDiariesByMonth(diaries);
			if (!newDiveidedDiaries) {
				state.props.dividedDiariesByMonth = [];
				state.props.lastDate = null;
				state.props.hasMore = false;
				return;
			}
			const lastList = newDiveidedDiaries[newDiveidedDiaries.length - 1];
			const lastItem = lastList[lastList.length - 1];
			const newLastDate = lastItem.date.seconds;
			state.props.dividedDiariesByMonth = newDiveidedDiaries;
			state.props.lastDate = newLastDate;
		},
		pushUpdatedDiary(state, action: PayloadAction<{ updatedDiary: Diary }>) {
			const { updatedDiary } = action.payload;
			state.props.updatedDiaries.push(updatedDiary);
		},
		syncUpdatedDiaries(state) {
			const updatedDividedDiaries = syncUpdatedDiariesWithSource(state);
			state.props.updatedDiaries = [];
			state.props.selectedPeriod = "all";
			if (!updatedDividedDiaries) {
				state.props.dividedDiariesByMonth = [];
				return;
			}
			state.props.initialDiaries = flattenToDiaries(updatedDividedDiaries);
			const newLastDate =
				state.props.initialDiaries[state.props.initialDiaries.length - 1].date
					.seconds;
			state.props.dividedDiariesByMonth = updatedDividedDiaries;
			state.props.lastDate = newLastDate;
		},
		setHasMore(state, action: PayloadAction<boolean>) {
			state.props.hasMore = action.payload;
		},
		setStatus(state, action: PayloadAction<string>) {
			state.props.status = action.payload;
		},
		setSelectedPeriod(state, action: PayloadAction<string>) {
			state.props.selectedPeriod = action.payload;
		},
		addEmpty(state) {
			const fullDiaries = addEmptyDiaries(
				state.props.dividedDiariesByMonth,
				state.props.selectedPeriod
			);
			state.props.dividedDiariesByMonth = fullDiaries;
			state.props.hasMore = false;
		},
		removeEmpty(state) {
			const diariesWithOutEmpty = removeEmptyDiaries(
				state.props.dividedDiariesByMonth
			);
			state.props.hasMore = false;
			if (!diariesWithOutEmpty.length || !diariesWithOutEmpty[0].length) {
				state.props.dividedDiariesByMonth = [];
				return;
			}
			state.props.dividedDiariesByMonth = diariesWithOutEmpty;
		},
		getDemoDiariesByPeriod(state, action: PayloadAction<string>) {
			const selectedValue = action.payload;
			const dividedDiariesByMonth = getDividedDiariesByMonth(
				state.props.initialDiaries
			);
			if (!dividedDiariesByMonth) {
				state.props.dividedDiariesByMonth = [];
				return;
			}
			if (selectedValue === "all") {
				state.props.dividedDiariesByMonth = dividedDiariesByMonth;
				return;
			}
			const [selectedYear, selectedMonth] = selectedValue.split("/");
			const diariesInMonth = dividedDiariesByMonth.find((diaries) => {
				const diariesDate = new Date(diaries[0].date.seconds * 1000);
				const year = diariesDate.getFullYear();
				const month = diariesDate.getMonth() + 1;
				return Number(selectedYear) === year && Number(selectedMonth) === month;
			});
			if (!diariesInMonth) {
				state.props.dividedDiariesByMonth = [];
				return;
			}
			state.props.dividedDiariesByMonth = [diariesInMonth];
		},
	},
	extraReducers: (builder) => {
		function startLoading(state: InitialState, action: PayloadAction) {
			state.props.status = "loading";
		}
		function failed(state: InitialState, action: any) {
			state.props.status = "failed";
			state.props.error = action.error.message;
		}
		builder
			.addCase(fetchDiaries.pending, startLoading)
			.addCase(fetchDiariesInMonth.pending, startLoading);
		builder.addCase(fetchDiaries.fulfilled, (state, action) => {
			state.props.status = "succeeded";
			state.props.initialDiaries = action.payload;
			state.props.selectedPeriod = "all";
			diariesSlice.caseReducers.updateSource(state, {
				type: "",
				payload: { diaries: action.payload },
			});
		});
		builder.addCase(fetchDiariesInMonth.fulfilled, (state, { payload }) => {
			state.props.status = "succeeded";
			state.props.selectedPeriod = payload.selectedValue;
			diariesSlice.caseReducers.updateSource(state, {
				type: "",
				payload: {
					diaries: payload.diariesInMonth,
					year: payload.year,
					month: payload.month,
				},
			});
		});
		builder.addCase(fetchMoreDiaries.fulfilled, (state, { payload }) => {
			if (!payload || !payload.nextDiaries.length) {
				state.props.hasMore = false;
				return;
			}
			const currentLastDate =
				payload.nextDiaries[payload.nextDiaries.length - 1].date.seconds;
			if (state.props.lastDate === currentLastDate) return;
			state.props.lastDate =
				payload.nextDiaries[payload.nextDiaries.length - 1].date.seconds;
			const flattenedDiaries = flattenToDiaries(
				state.props.dividedDiariesByMonth
			);
			diariesSlice.caseReducers.updateSource(state, {
				type: "",
				payload: {
					diaries: [...flattenedDiaries, ...payload.nextDiaries],
				},
			});
		});
		builder.addCase(fetchOldestDiary.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.props.oldestDiary = action.payload;
		});
		builder.addCase(fetchSuccessiveDaysCount.fulfilled, (state, action) => {
			state.props.successiveDaysCount = action.payload.daysCount;
		});
		builder.addCase(setDiaryInDiaries.fulfilled, (state, action) => {
			const newDiary = action.payload;
			if (!newDiary) return;
			const flattenedDiaries = flattenToDiaries(
				state.props.dividedDiariesByMonth
			);
			const newDiaries = flattenedDiaries.map((diary) => {
				if (diary.date.seconds === newDiary.date.seconds) return newDiary;
				return diary;
			});
			const newDiaryIndex = flattenedDiaries.findIndex((diary) => {
				return diary.date.seconds === newDiary.date.seconds;
			});
			if (!newDiaries.length || newDiaryIndex < 0) newDiaries.push(newDiary);
			const devidedDiaries = getDividedDiariesByMonth(newDiaries);
			if (!devidedDiaries) return;
			state.props.dividedDiariesByMonth = devidedDiaries;
		});
		builder
			.addCase(fetchDiaries.rejected, failed)
			.addCase(fetchDiariesInMonth.rejected, failed)
			.addCase(fetchMoreDiaries.rejected, failed)
			.addCase(fetchOldestDiary.rejected, failed)
			.addCase(fetchSuccessiveDaysCount.rejected, failed)
			.addCase(setDiariesToDB.rejected, failed);
	},
});
const syncUpdatedDiariesWithSource = (state: InitialState) => {
	const updatedDiaries = state.props.updatedDiaries;
	let initialDiaries = state.props.initialDiaries;
	updatedDiaries.forEach((updatedDiary) => {
		const hasFilledEvent = getFilledEventCount(updatedDiary);
		const oldDiary = initialDiaries.find(
			(diary) => diary.date.seconds === updatedDiary.date.seconds
		);
		const modified = hasFilledEvent && oldDiary;
		const deleted = !hasFilledEvent && oldDiary;
		const noOldDiary = hasFilledEvent && !oldDiary;
		if (modified) {
			Object.assign(oldDiary, updatedDiary);
		} else if (deleted) {
			initialDiaries = initialDiaries.filter(
				(diary) => diary.date.seconds !== updatedDiary.date.seconds
			);
		} else if (noOldDiary) {
			const afterInitialPeriod = checkDiaryIfAfterPeriod(
				updatedDiary,
				initialDiaries
			);
			if (afterInitialPeriod) {
				initialDiaries.push(updatedDiary);
				initialDiaries = sortByDiaryData(initialDiaries);
				initialDiaries.pop();
			}
		}
	});
	return getDividedDiariesByMonth(initialDiaries);
};

export const {
	initDiariesState,
	updateSource,
	pushUpdatedDiary,
	syncUpdatedDiaries,
	setHasMore,
	addEmpty,
	removeEmpty,
	setStatus,
	setSelectedPeriod,
	getDemoDiariesByPeriod,
} = diariesSlice.actions;
export default diariesSlice.reducer;

export const selectDevidedDiaries = (state: RootState) =>
	state.diaries.props.dividedDiariesByMonth;
export const selectDiariesState = (state: RootState) => state.diaries.props;
export const selectDiariesStatus = (state: RootState) =>
	state.diaries.props.status;
export const selectLastDate = (state: RootState) =>
	state.diaries.props.lastDate;
export const selectHasMore = (state: RootState) => state.diaries.props.hasMore;
export const selectOldestDiary = (state: RootState) =>
	state.diaries.props.oldestDiary;
export const selectInitialDiaries = (state: RootState) =>
	state.diaries.props.initialDiaries;
export const selectSelectedPeriod = (state: RootState) =>
	state.diaries.props.selectedPeriod;
export const selectSuccessiveDays = (state: RootState) =>
	state.diaries.props.successiveDaysCount;
