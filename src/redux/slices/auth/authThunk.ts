import { createAsyncThunk } from '@reduxjs/toolkit'
import { valueTypes } from '../../../types/types'
import axios from '../../../axios'
// Create an async thunk for user registration
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (params: valueTypes) => {
    try {
      const { data } = await axios.post('/auth/register', params)
      return data
    } catch (error) {
      // console.log(error)
      throw error
    }
  }
)

// Create an async thunk to fetch user data
export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async (params: valueTypes) => {
    try {
      // Make a POST request to the /auth/login endpoint with the provided params
      const { data } = await axios.post('/auth/login', params)
      // Return the fetched data
      return data
    } catch (error) {
      // If an error occurs, log it to the console and re-throw the error
      console.log(error || 'cant login')
      throw error
    }
  }
)

export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    // Make a request to the logout endpoint on your server to clear the token
    const response = await axios.post('/auth/logout')
    return response.data.message
  } catch (error) {
    console.log('Error during logout:', error)
  }
})
