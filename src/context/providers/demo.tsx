import React, { useEffect, createContext, useContext, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
	initDiaryState,
	InitialState as InitialDiary,
	selectDiary,
	syncUpdateEventsStatus,
} from "context/slices/diary";
import {
	pushUpdatedDiary,
	selectDiariesState,
	syncUpdatedDiaries,
	InitialState as InitialDiaries,
	initDiariesState,
	selectDevidedDiaries,
} from "context/slices/diaries";
import {
	selectInputDrawerIndex,
	selectInputDrawerStatus,
	selectIsInputDrawerOpened,
	selectTutorialStatus,
	setCurrentTurialStatus,
	setInputButtonDisabled,
} from "context/slices/ui";
import { Diary } from "interfaces";
import { parse, startOfDay, format, sub } from "date-fns";
import {
	flattenToDiaries,
	getDividedDiariesByMonth,
	getInitialDiary,
	updateEventStatus,
} from "libs/diaries";
import { ParsedUrlQuery } from "querystring";
import {
	getHappinessCategories,
} from "libs/happinessCategory";

export const welcomeContext = createContext(
	{} as {
		openWelcome: boolean;
		setOpenWelcome: React.Dispatch<React.SetStateAction<boolean>>;
	}
);
export const initWelcomeContext = () => {
	const [openWelcome, setOpenWelcome] = useState(false);
	return { openWelcome, setOpenWelcome };
};

export const useWelcomeContext = () => {
	return useContext(welcomeContext);
};

type Props = {
	openWelcome: boolean;
	setOpenWelcome: React.Dispatch<React.SetStateAction<boolean>>;
	children: JSX.Element | JSX.Element[];
};
export const WelcomeProvider = ({
	children,
	openWelcome,
	setOpenWelcome,
}: Props) => {
	return (
		<welcomeContext.Provider value={{ openWelcome, setOpenWelcome }}>
			{children}
		</welcomeContext.Provider>
	);
};

// provider
export const DemoProvider = ({ children }: { children: JSX.Element }) => {
	const { query, pathname, push } = useRouter();
	const dispatch = useDispatch();
	const diary = useSelector(selectDiary);
	const status = useSelector(selectInputDrawerStatus);
	const isInputDrawerOpened = useSelector(selectIsInputDrawerOpened);
	const index = useSelector(selectInputDrawerIndex);
	const diariesState = useSelector(selectDiariesState);
	const devidedDiaries = useSelector(selectDevidedDiaries);
	const tutorialStatuse = useSelector(selectTutorialStatus);

	//
	// DiaryState関連
	//
	let diaryId: string;
	if (pathname.includes("/demo/input")) {
		const { date } = query as { date: string[] };
		diaryId = date.join("-");
	}

	// useEffect return内からstateを参照するため
	const DiaryRef = React.useRef(diary);
	DiaryRef.current = diary;
	useEffect(() => {
		if (!pathname.includes("/demo/input") || !diaryId) return;
		const currentDiary = getDiaryFromDiaries(query, devidedDiaries);
		const eventsStatus = updateEventStatus(currentDiary.events);

		const dummyDiaryState: InitialDiary = {
			item: {
				diary: currentDiary,
				eventsStatus,
			},
			status: "succeeded",
			error: "",
		};
		dispatch(initDiaryState(dummyDiaryState));
		const year = Number(diaryId.split("-")[0]);
		const today = format(new Date(), "yyyy/MM/dd");
		if (year < 1900) push(`/demo/input/${today}`);
		return () => {
			if (!DiaryRef.current) return;
			dispatch(pushUpdatedDiary({ updatedDiary: DiaryRef.current }));
		};
	}, [query, devidedDiaries]);

	// inputDrawerに入力ない時にボタンをdisableにする
	React.useEffect(() => {
		if (!pathname.includes("/demo/input") || !diaryId) return;
		dispatch(syncUpdateEventsStatus());
	}, [status, diary]);

	React.useEffect(() => {
		if (!pathname.includes("/demo/input") || !diaryId) return;
		if (isInputDrawerOpened || !diary) return;
		dispatch(syncUpdateEventsStatus());
	}, [isInputDrawerOpened]);

	//
	// DiariesState関連
	//
	useEffect(() => {
		if (!pathname.includes("/demo/log")) return;
		if (diariesState.initialDiaries.length) {
			dispatch(syncUpdatedDiaries());
		}
	}, [query]);

	// Demoページから実際の記入ページに移行する時のデモデータ除去
	useEffect(() => {
		return () => {
			dispatch(initDiaryState());
			dispatch(initDiariesState());
		};
	}, []);

	// other -> log 移動時にDiariesState状態更新
	useEffect(() => {
		if (!pathname.includes("/demo/")) return;
		dispatch(initDiariesState(initialDiaries));
	}, []);
	//
	// チュートリアル関連
	//
	// diary取得時にチュートリアルの情報を判断
	const prevRef = React.useRef<Diary | null>(null);
	React.useEffect(() => {
		if (!prevRef.current && diary) {
			dispatch(setCurrentTurialStatus(undefined));
		}
		prevRef.current = diary;
	}, [diary]);

	React.useEffect(() => {
		if (!diary) return;
		const inDemo = pathname.includes("/demo/");
		if (tutorialStatuse !== "unshown" && inDemo) {
			dispatch(setCurrentTurialStatus(undefined));
			return;
		}
	}, [query]);

	return <>{children}</>;
};

const getDiaryFromDiaries = (
	query: ParsedUrlQuery,
	devidedDiaries: Diary[][]
) => {
	const diaries = flattenToDiaries(devidedDiaries);
	const { date: dateArr } = query as { date: string[] };
	const diaryId = dateArr.join("-");
	const date = parse(diaryId, "yyyy-MM-dd", new Date());
	const seconds = date.getTime() / 1000;
	const diary = diaries.find((diary) => diary.date.seconds === seconds);
	const initialDiary = getInitialDiary(diaryId);
	return diary ? diary : initialDiary;
};

export const createDummyDiaries = (): Diary[] => {
	const today = startOfDay(new Date());
	const lastManthToday = sub(today, { months: 1 });
	const dateList1 = [...Array(7)].map((_, i) => sub(today, { days: i }));
	const dateList2 = [...Array(7)].map((_, i) =>
		sub(lastManthToday, { days: i })
	);
	const diaryIds = [...dateList1, ...dateList2].map((date) =>
		format(date, "yyyy-MM-dd")
	);
	const diaries = diaryIds.map((id) => getInitialDiary(id));
	//
	// setEvent(diaries[0], 0, "その他", "今日も地球が平和だった");
	// setEvent(diaries[0], 1, "その他", "今日も地球が平和だった");
	// setEvent(diaries[0], 2, "その他", "今日も地球が平和だった");
	//
	setEvent(diaries[1], 0, "家族", "オンラインで一緒にご飯を食べた ");
	setEvent(diaries[1], 1, "運動", "ジョギングに行って汗を流した");
	setEvent(diaries[1], 2, "自然", "天気が良くて外が気持ちよかった ");
	//
	setEvent(diaries[2], 0, "リラックス", "たくさん寝れた");
	setEvent(diaries[2], 1, "娯楽", "DQ7面白い");
	setEvent(diaries[2], 2, "食事", "お昼にパンを食べて美味しかった");
	//
	setEvent(diaries[3], 0, "新しい経験", "行きたかったカフェに行った");
	setEvent(diaries[3], 1, "リラックス", "友達とお茶をした ");
	setEvent(diaries[3], 2, "友達", "悩みを相談して気が晴れた ");
	//
	setEvent(diaries[4], 0, "動物・ペット", "外でかわいい猫に出会った ");
	//
	setEvent(diaries[5], 0, "娯楽", "ひいきのチームが勝った ");
	setEvent(diaries[5], 1, "交流", "新しい友達ができた");
	//
	setEvent(diaries[6], 0, "仕事", "契約が成立した");
	setEvent(diaries[6], 1, "収入・お得", "50％オフのお寿司が買えた");
	setEvent(diaries[6], 2, "成功", "目覚めが良かった");
	//
	setEvent(diaries[7], 0, "交流", "昨日書いたブログにコメントがついた");
	setEvent(diaries[7], 1, "えらい", "ブログを一本書いた");
	setEvent(diaries[7], 2, "娯楽", "ドラクエの新作が発表された");
	//
	setEvent(diaries[8], 0, "勉強", "TOEICの勉強をした");
	setEvent(diaries[8], 1, "えらい", "ブログを一本書いた");
	setEvent(diaries[8], 2, "食事", "初めて行った中華が美味しかった");
	//
	setEvent(diaries[9], 0, "お出かけ", "友達とぶどう狩りに行った");
	setEvent(diaries[9], 1, "ファッション", "服装を褒めてもらえた");
	setEvent(diaries[9], 2, "贈り物", "誕生日プレゼントをもらった");
	//
	setEvent(diaries[10], 0, "仕事", "予定してたより作業が早く終わった");
	setEvent(diaries[10], 1, "仕事", "お客さんに喜んでもらえた");
	//
	setEvent(diaries[11], 0, "料理", "シチューが上手くできた");
	setEvent(diaries[11], 1, "娯楽", "友達とAmong usして楽しかった");
	setEvent(diaries[11], 2, "えらい", "目標の分だけ勉強できた");
	//
	setEvent(diaries[12], 0, "その他", "今日も地球が平和だった");
	//
	setEvent(diaries[13], 0, "その他", "今日も地球が平和だった");
	return diaries;
};

const setEvent = (
	diary: Diary,
	index: number,
	categoryName: string,
	mainText: string
) => {
	diary.events[index].category = getCategoryByName(categoryName);
	diary.events[index].textFields[0].value = mainText;
};

export const getCategoryByName = (name: string) => {
	const categories = getHappinessCategories();
	return categories.find((cate) => cate.name === name) || categories[0];
};

const initialDiaries: InitialDiaries = {
	props: {
		dividedDiariesByMonth: getDividedDiariesByMonth(createDummyDiaries())!,
		selectedPeriod: "all",
		lastDate: null,
		updatedDiaries: [],
		initialDiaries: createDummyDiaries(),
		status: "succeeded",
		error: "",
		hasMore: false,
		oldestDiary: createDummyDiaries()[createDummyDiaries().length - 1],
		successiveDaysCount: 7,
	},
};
