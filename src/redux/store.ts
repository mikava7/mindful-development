import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import { postReducer } from './slices/posts'
// import { authReducer } from './slices/auth'
import { authReducer } from './slices/auth/authSlice'

import { commentReducer } from './slices/commentSlice'
import favoritesSlice from './slices/favoriteSlice'

const store = configureStore({
  reducer: {
    posts: postReducer,
    auth: authReducer,
    comments: commentReducer,
    favorites: favoritesSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export default store
