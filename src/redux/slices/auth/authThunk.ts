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
