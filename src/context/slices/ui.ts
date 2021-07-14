import {
  createAsyncThunk,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'
import type { RootState } from 'context/reduxStore'
import { selectEventStatus } from 'context/slices/diary'


export type InputDrawerStatue = "category" | "text" | "close"
export type TutorialStatue = "unshown" | "welcome" | "firstClick" | "categorySelect1" | "textInput1" | "categorySelect2" | "textInput2" | "categorySelect3" | "textInput3" | "secondClick" | "thirdClick" | "firstComplete" | "fullComplete" | "yesterday"
type InitialState = {
  inputDrawer: {
    open: boolean,
    isListOpened: boolean,
    index: number,
    status: InputDrawerStatue
  },
  inputButton: {
    // status: "link" | "create" | "submit",
    disabled: boolean
  },
  tutorial: {
    status: TutorialStatue,
    toYesterday: boolean
  }
}
const initialState: InitialState = {
  inputDrawer: {
    open: false,
    isListOpened: false,
    index: 0,
    status: "close"
  },
  inputButton: {
    // status: "link",
    disabled: true
  },
  tutorial: {
    status: "unshown",
    toYesterday: false
  }
}

export const setCurrentTurialStatus = createAsyncThunk("ui/setCurrentTurialStatus",
  (_: unknown, { getState }) => {
    const eventStatus = selectEventStatus((getState() as RootState))
    return eventStatus;
  })

interface openPayload {
  status: InputDrawerStatue,
  index: number
}
export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    initUiState(state) {
      state.inputDrawer = initialState.inputDrawer;
      state.inputButton = initialState.inputButton;
      state.tutorial = initialState.tutorial;
    },
    setOpenInputDrawer(state, action: PayloadAction<openPayload>) {
      const { status, index } = action.payload
      state.inputDrawer.status = status
      if (action.payload.status === "close") {
        state.inputDrawer.open = false
      } else {
        state.inputDrawer.open = true
        state.inputDrawer.index = index
      }
    },
    toggleListOpened(state, action: PayloadAction<boolean | null>) {
      if (action.payload === null) {
        state.inputDrawer.isListOpened = !state.inputDrawer.isListOpened
      } else {
        state.inputDrawer.isListOpened = action.payload
      }
    },
    setInputButtonDisabled(state, action: PayloadAction<boolean>) {
      state.inputButton.disabled = action.payload
    },
    setToYesterday(state, action: PayloadAction<boolean>) {
      state.tutorial.toYesterday = action.payload
    },
    setTutorialStatus(state, action: PayloadAction<TutorialStatue>) {
      state.tutorial.status = action.payload
    },
    goNextTutorial(state) {
      const tutorialTimeTable: TutorialStatue[] = [
        "welcome", //途中離脱からの復帰ポイント
        "firstClick",
        "categorySelect1",
        "textInput1",
        "firstComplete", //途中離脱からの復帰ポイント
        "secondClick",
        "categorySelect2",
        "textInput2",
        "thirdClick", //途中離脱からの復帰ポイント
        "categorySelect3",
        "textInput3",
        "fullComplete", //途中離脱からの復帰ポイント
        "unshown"
      ];
      const currentIndex = tutorialTimeTable.findIndex(item => {
        return item === state.tutorial.status
      })
      if (currentIndex < 0) throw new Error("there is no program in Tutorial: " + state.tutorial.status);
      let nextStatus = tutorialTimeTable[currentIndex + 1]
      if (!nextStatus) nextStatus = "unshown"
      state.tutorial.status = nextStatus
    }
  },
  extraReducers: builder => {
    builder.addCase(setCurrentTurialStatus.fulfilled, (state, { payload: eventStatus }) => {
      const textFilledEvents = eventStatus.filter(s => s === "textFilled")
      if (textFilledEvents.length === 0) {
        state.tutorial.status = "welcome"
      } else if (textFilledEvents.length === 1) {
        state.tutorial.status = "firstComplete"
      } else if (textFilledEvents.length === 2) {
        state.tutorial.status = "thirdClick"
      } else if (textFilledEvents.length === 3) {
        state.tutorial.status = "fullComplete"
      }
    })
  }
})

export const { initUiState, setOpenInputDrawer, setInputButtonDisabled, setTutorialStatus,
  goNextTutorial, setToYesterday, toggleListOpened } = uiSlice.actions
export default uiSlice.reducer

export const selectIsInputDrawerOpened = (state: RootState) => state.ui.inputDrawer.open
export const selectIsListOpened = (state: RootState) => state.ui.inputDrawer.isListOpened
export const selectInputDrawerIndex = (state: RootState) => state.ui.inputDrawer.index
export const selectInputDrawerStatus = (state: RootState) => state.ui.inputDrawer.status
export const selectInputButtonDisabled = (state: RootState) => state.ui.inputButton.disabled
export const selectTutorialStatus = (state: RootState) => state.ui.tutorial.status
export const selectToYeasterday = (state: RootState) => state.ui.tutorial.toYesterday