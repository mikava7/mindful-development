import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from '../../../axios'
import { RootState } from '../../store'
import { Author } from '../../../types/types'

interface UsersData {
  AllUser: Author[]
  // You can add other properties here if needed
}
export const getAllUsers = createAsyncThunk<UsersData[]>(
  'users/getAllUsers',
  async () => {
    try {
      const { data } = await axios.get('/auth/users')

      return [data]
    } catch (error) {
      console.log('Error fetching all users:', error)
      throw error
    }
  }
)

interface UsersState {
  users: UsersData[]
  status: string
  error: string | null
}
const initialState: UsersState = {
  users: [],
  status: 'idle',
  error: null,
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        // When the async thunk is pending, set the status to "loading" and clear any existing data
        state.status = 'loading'
        state.users = []
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        // When the async thunk is fulfilled, set the status to "loaded" and update the data with the fetched data
        state.status = 'succeeded'
        state.users = action.payload
      })
      .addCase(getAllUsers.rejected, (state) => {
        // When the async thunk is rejected, set the status to "error" and clear any existing data
        state.status = 'failed'
        state.users = []
      })
  },
})

export const selectUsers = (state: RootState) => state.users.users
export const selectUsersLoadingStatus = (state: RootState) => state.users.status
export const selectUsersErrorState = (state: RootState) => state.users.error

export const usersReducer = usersSlice.reducer
