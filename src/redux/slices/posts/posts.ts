import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import instance from '../../../axios'
import { RootState } from '../../store'
import { Post, Fields } from '../../../types/types'
import type { PayloadAction } from '@reduxjs/toolkit'
import {
  deletePost,
  fetchPosts,
  fetchSinglePosts,
  updateViewCount,
  createPost,
} from './postThunk'

interface PostState {
  items: Post[]
  reactedBy: string[]
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected'
  error: string | null
}

const initialState: PostState = {
  items: [],
  reactedBy: [],
  status: 'idle',
  error: null,
}

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.items = []
        state.status = 'pending'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = 'fulfilled'
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.items = []
        state.status = 'rejected'
      })
      .addCase(createPost.pending, (state) => {
        state.items = []
        state.status = 'pending'
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.items.push(action.payload)
        state.status = 'fulfilled'
      })
      .addCase(createPost.rejected, (state) => {
        state.items = []
        state.status = 'rejected'
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter((post) => post._id !== action.payload)
        state.status = 'fulfilled'
      })
      .addCase(
        updateViewCount.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = 'rejected'
          state.error = action.error?.message ?? null
        }
      )
  },
})

export const selectPostError = (state: RootState) => state.auth.error
export const selectPostStatus = (state: RootState) => state.auth.status

export const selectPosts = (state: RootState) => state.posts.items
export const postReducer = postSlice.reducer
