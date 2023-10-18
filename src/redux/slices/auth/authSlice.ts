import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store' // Corrected the typo 'Rootstate' to 'RootState'
import axios from '../../../axios'
import { valueTypes } from '../../../types/types'

// Create an async thunk for user registration
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (params: valueTypes) => {
    try {
      // Make a POST request to the /auth/register endpoint with the provided params
      const { data } = await axios.post('/auth/register', params)

      // Return the fetched data
      return data
    } catch (error) {
      throw error
    }
  }
)

// Define the initial state for the auth slice
interface AuthState {
  userData: null | string
  status: 'idle' | 'loading' | 'loaded' | 'error' // Corrected the type for 'status'
  error: null | string
}

const initialState: AuthState = {
  userData: null,
  status: 'idle',
  error: null,
}

// Create the auth slice using createSlice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        // When the async thunk is pending, set the status to "loading" and clear any existing data
        state.status = 'loading'
        state.userData = null // Corrected the field name to 'userData'
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<string>) => {
          // When the async thunk is fulfilled, set the status to "loaded" and update the userData with the fetched data
          state.status = 'loaded'
          state.userData = action.payload
        }
      )
      .addCase(registerUser.rejected, (state) => {
        // When the async thunk is rejected, set the status to "error" and clear any existing data
        state.status = 'error'
        state.userData = null // Corrected the field name to 'userData'
      })
  },
})

// Export the reducer and actions
export const authReducer = authSlice.reducer
export const {} = authSlice.actions
