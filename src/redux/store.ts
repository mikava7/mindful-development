import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import { postReducer } from './slices/posts/posts'
// import { authReducer } from './slices/auth'
import { authReducer } from './slices/auth/authSlice'
import { commentReducer } from './slices/commentSlice'
import favoritesSlice from './slices/favoriteSlice'
import { tagsReducer } from './slices/tags/tagsSlice'
import { usersReducer } from './slices/user/userSlice'
const store = configureStore({
  reducer: {
    posts: postReducer,
    auth: authReducer,
    users: usersReducer,
    comments: commentReducer,
    favorites: favoritesSlice,
    tags: tagsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export default store
