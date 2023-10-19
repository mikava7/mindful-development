import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import { registerUser } from './authThunk'

// Define the initial state for the auth slice
interface AuthState {
  userData: null | string // Represents user data
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected' // Status for the async action
  error: null | string // Represents any error
}

const initialState: AuthState = {
  userData: null,
  status: 'idle', // Initial status is 'idle'
  error: null,
}

// Create the auth slice using createSlice
const authSlice = createSlice({
  name: 'auth', // Slice name
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        // When the async thunk is pending, set the status to 'pending' and clear any existing user data
        state.status = 'pending'
        state.userData = null
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<string>) => {
          // When the async thunk is fulfilled, set the status to 'fulfilled' and update the user data with the fetched data
          state.status = 'fulfilled'
          state.userData = action.payload
        }
      )
      .addCase(registerUser.rejected, (state) => {
        // When the async thunk is rejected, set the status to 'rejected' and clear any existing user data
        state.status = 'rejected'
        state.userData = null
      })
  },
})

// Select the auth status from the state
export const selectAuthStatus = (state: RootState) => state.auth.status
// Select the user data from the state
export const selectUserData = (state: RootState) => state.auth.userData

// Select the error information from the state
export const selectAuthError = (state: RootState) => state.auth.error

// Export the reducer and actions
export const {} = authSlice.actions

export const authReducer = authSlice.reducer
