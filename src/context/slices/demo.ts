import {
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'
import type { RootState } from 'context/reduxStore'
import { Diary } from 'interfaces'


export type InputDrawerStatue = "category" | "text" | "close"
export type TutorialStatue = "unshown" | "welcome" | "firstClick" | "categorySelect1" | "textInput1" | "categorySelect2" | "textInput2" | "categorySelect3" | "textInput3" | "secondClick" | "thirdClick" | "firstComplete" | "fullComplete" | "yesterday"
type InitialState = {
  signupWithDemo: boolean,
  newDiariesInDemo: Diary[]
}
const initialState: InitialState = {
  signupWithDemo: false,
  newDiariesInDemo: []
}


export const demoSlice = createSlice({
  name: "demo",
  initialState,
  reducers: {
    initDemoState(state) {
      state.signupWithDemo = initialState.signupWithDemo;
      state.newDiariesInDemo = initialState.newDiariesInDemo;
    },
    setSignupWithDemo(state, action: PayloadAction<boolean>) {
      state.signupWithDemo = action.payload
    },
    setNewDiariesInDemo(state, action: PayloadAction<Diary[]>) {
      state.newDiariesInDemo = action.payload
    },
  },
})

export const { initDemoState, setSignupWithDemo, setNewDiariesInDemo } = demoSlice.actions
export default demoSlice.reducer

export const selectSignupWithDemo = (state: RootState) => state.demo.signupWithDemo
export const selectNewDiariesInDemo = (state: RootState) => state.demo.newDiariesInDemo
