import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import { registerUser, fetchLogin, logout } from './authThunk'
import { UserType } from '../../../types/types'
// Define the initial state for the auth slice
interface AuthState {
  userData: UserType | null | undefined
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected'
  error: null | string
}

const initialState: AuthState = {
  userData: null,
  status: 'idle',
  error: null,
}

// Create the auth slice using createSlice
const authSlice = createSlice<AuthState, any, 'auth'>({
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
      .addCase(registerUser.fulfilled, (state, action) => {
        // When the async thunk is fulfilled, set the status to 'fulfilled' and update the user data with the fetched data
        state.status = 'fulfilled'
        state.userData = action.payload
      })
      .addCase(registerUser.rejected, (state) => {
        // When the async thunk is rejected, set the status to 'rejected' and clear any existing user data
        state.status = 'rejected'
        state.userData = null
      })
      .addCase(fetchLogin.pending, (state) => {
        // When the async thunk is pending, set the status to "loading" and clear any existing data
        state.status = 'pending'
        state.userData = null
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        // When the async thunk is fulfilled, set the status to "loaded" and update the data with the fetched data
        state.status = 'fulfilled'
        state.userData = action.payload
      })
      .addCase(fetchLogin.rejected, (state) => {
        // When the async thunk is rejected, set the status to "error" and clear any existing data
        state.status = 'rejected'
        state.userData = null
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = 'idle'

        state.userData = null
        state.error = action.payload
      })
      .addMatcher(
        (action) =>
          action.type.startsWith('auth/') && action.type.endsWith('fulfilled'),
        (state, action) => {
          // Update the user ID selector when user data is fetched
          state.userData = action.payload
        }
      )
  },
})

// Select the auth status from the state
export const selectAuthStatus = (state: RootState) => state.auth.status
// Select the user data from the state
export const selectUserData = (state: RootState) => state.auth.userData

// Select the error information from the state
export const selectAuthError = (state: RootState) => state.auth.error
export const selectUserId = (state: RootState) => state.auth.userData?._id || ''

// Export the reducer and actions
export const {} = authSlice.actions

export const authReducer = authSlice.reducer
