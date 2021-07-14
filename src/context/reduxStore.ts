import { configureStore } from '@reduxjs/toolkit'
import diaryReducer from 'context/slices/diary'
import diariesSlice from 'context/slices/diaries'
import userSlice from 'context/slices/user'
import uiSlice from 'context/slices/ui'
import demoSlice from 'context/slices/demo'

export const store = configureStore({
  reducer: {
    diary: diaryReducer,
    diaries: diariesSlice,
    user: userSlice,
    ui: uiSlice,
    demo: demoSlice
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch