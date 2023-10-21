import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { Author } from '../../../types/types'
import { getAllUsers, fetchUserById, editUserInfo } from './userThunk'
import { UserType } from '../../../types/types'
interface UsersData {
  AllUser: Author[]
  // You can add other properties here if needed
}

interface UsersState {
  users: UsersData[]
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected'
  error: string | null
  user: UserType | null | string
}
const initialState: UsersState = {
  users: [],
  status: 'idle',
  error: null,
  user: null,
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        // When the async thunk is pending, set the status to "loading" and clear any existing data
        state.status = 'pending'
        state.users = []
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        // When the async thunk is fulfilled, set the status to "loaded" and update the data with the fetched data
        state.status = 'fulfilled'
        state.users = action.payload
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        // When the async thunk is rejected, set the status to "error" and clear any existing data
        state.status = 'rejected'
        state.error = action.error.message || 'An error occurred'

        state.users = []
      })
      .addCase(fetchUserById.pending, (state) => {
        state.status = 'pending'

        state.user = null
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        // When the async thunk is fulfilled, set the status to "loaded" and update the data with the fetched data
        state.status = 'fulfilled'
        state.user = action.payload
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        // When the async thunk is rejected, set the status to "error" and clear any existing data
        state.status = 'rejected'
        state.user = null
        state.error = action.error.message || 'An error occurred'
      })
      .addCase(editUserInfo.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(editUserInfo.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.user = action.payload
      })
      .addCase(editUserInfo.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.error.message || 'An error occurred'
      })
  },
})

export const selectUsers = (state: RootState) => state.users.users
export const selectUser = (state: RootState) => state.users.user

export const selectUsersLoadingStatus = (state: RootState) => state.users.status
export const selectUsersErrorState = (state: RootState) => state.users.error

export const usersReducer = usersSlice.reducer
