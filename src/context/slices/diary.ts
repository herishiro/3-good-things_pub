import {
  createSlice,
  createAsyncThunk,
  PayloadAction
} from '@reduxjs/toolkit'
import type { RootState } from 'context/reduxStore'
import { Diary, FieldKey, HappinessCategory } from "interfaces";
import { getFilledEventCount, getInitialDiary, sortFilledEvents, updateEventStatus } from "libs/diaries";
import { deleteDiary, getDiary, setDiary } from 'libs/firebase/db';
import { completeLoading } from './user';

export type EventStatus = "empty" | "categoryFilled" | "textFilled"
export interface EventItem<T> {
  diary: Diary | null,
  eventsStatus: [T, T, T]
}
export interface InitialState {
  item: EventItem<EventStatus>,
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | undefined
}
const initialState: InitialState = {
  item: {
    diary: null,
    eventsStatus: ["empty", "empty", "empty"]
  },
  status: "idle",
  error: ""
}

interface fetchPayload { userId: string, diaryId: string }
export const fetchDiary = createAsyncThunk("diary/fetchDiary",
  async ({ userId, diaryId }: fetchPayload) => {
    const newDiary = await getDiary({ userId, diaryId });
    const initialDiary = newDiary || (await getInitialDiary(diaryId));
    return initialDiary
  })

type Prop3 = { diaryId: string; userId: string; };

export const setDiaryToDB = createAsyncThunk("diary/setDiaryToDB",
  async ({ diaryId, userId }: Prop3, { getState }) => {
    const diary = selectDiary((getState() as RootState))
    if (!diary) throw new Error("no diary");
    const hasFilledEvent = await getFilledEventCount(diary);
    let res;
    if (hasFilledEvent) {
      res = await setDiary({ diaryId, userId, diary });
    } else if (diary && !hasFilledEvent) {
      res = await deleteDiary({ diaryId, userId });
    }
    return res;
  })

interface updateCatPayload { cardIndex: number; newValue: HappinessCategory | null; }
interface updateTextPayload { cardIndex: number; label: FieldKey; newValue: string; }
interface initPayload { initialDiary: Diary; }
interface ExamplePayload {
  type: "add" | "remove",
  example: string,
  index: number
}
export const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {
    initDiaryState(state, action: PayloadAction<InitialState | undefined>) {
      if (!action.payload) {
        state.item = initialState.item;
        state.status = initialState.status;
        state.error = initialState.error;
      } else {
        state.item = action.payload.item;
        state.status = action.payload.status;
        state.error = action.payload.error;
      }
    },
    updateCategory({ item }, action: PayloadAction<updateCatPayload>) {
      if (!item.diary) return;
      const { cardIndex, newValue } = action.payload;
      const event = item.diary.events.find((event) => event.id === cardIndex + 1);
      if (!event) return
      event.category = newValue;
    },
    updateTextField({ item }, action: PayloadAction<updateTextPayload>) {
      if (!item.diary) return;
      const { cardIndex, label, newValue } = action.payload;
      const event = item.diary.events.find((event) => event.id === cardIndex + 1);
      if (!event) return
      const field = event.textFields.find((field) => field.name === label);
      if (!field) throw new Error()
      field.value = newValue;
    },
    initDiary({ item }, action: PayloadAction<initPayload>) {
      const { initialDiary } = action.payload;
      item.diary = initialDiary
    },
    handleExample({ item }, action: PayloadAction<ExamplePayload>) {
      if (!item.diary) return;
      const { index, example, type } = action.payload;
      const event = item.diary.events.find((event) => event.id === index + 1);
      if (!event) return

      if (type === "add") {
        event.textFields[0].value += example + " "
      } else if (type === "remove") {
        event.textFields[0].value = event.textFields[0].value.replace(example + " ", "")
      }
    },
    syncUpdateEventsStatus({ item }) {
      if (!item.diary) return
      // if (!item.diary) throw new Error("no diary to update! in syncUpdateEventsStatus");
      item.eventsStatus = updateEventStatus(item.diary.events)
    },
    setDiaryInLitener(state, action: PayloadAction<Diary>) {
      if (!state.item.diary) return
      state.status = 'succeeded'
      const sortedEvents = sortFilledEvents(action.payload.events)
      const eventsStatus = updateEventStatus(action.payload.events)
      state.item.diary = action.payload
      state.item.diary.events = sortedEvents
      state.item.eventsStatus = eventsStatus
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchDiary.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchDiary.fulfilled, (state, action) => {
      state.status = 'succeeded'
      const sortedEvents = sortFilledEvents(action.payload.events)
      const eventsStatus = updateEventStatus(action.payload.events)
      state.item.diary = action.payload
      state.item.diary.events = sortedEvents
      state.item.eventsStatus = eventsStatus
    })
    builder.addCase(fetchDiary.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
    builder.addCase(setDiaryToDB.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
  }
})

export const {
  initDiary,
  updateCategory,
  updateTextField,
  initDiaryState,
  handleExample,
  syncUpdateEventsStatus,
  setDiaryInLitener } = diarySlice.actions
export default diarySlice.reducer

export const selectDiary = (state: RootState) => state.diary.item.diary
export const selectEventStatus = (state: RootState) => state.diary.item.eventsStatus
export const selectDiaryStatus = (state: RootState) => state.diary.status
export const selectExamples = (state: RootState, index: number) => {
  const exmples = state.diary.item.diary?.events[index].category?.examples
  return exmples || []
}
export const selectCategory = (state: RootState, index: number) => {
  const category = state.diary.item.diary?.events[index].category
  return category || null
}
export const selectField = (state: RootState, cardIndex: number, fieldLabel: string) => {
  if (!state.diary.item.diary) throw new Error("selectField failed");
  return state.diary.item.diary.events[cardIndex].textFields.find(
    (field) => field.label === fieldLabel
  )
};