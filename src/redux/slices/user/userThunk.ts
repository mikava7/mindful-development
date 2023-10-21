import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../axios'
import { RootState } from '../../store'
import { UserType } from '../../../types/types'

interface UserCredentials {
  fullName: string
  email: string
  imageUrl: string
}
export const getAllUsers = createAsyncThunk('users/getAllUsers', async () => {
  try {
    const { data } = await axios.get('/auth/users')

    return [data]
  } catch (error) {
    console.log('Error fetching all users:', error)
    throw error
  }
})

export const fetchUserById = createAsyncThunk<UserType, string>(
  'users/fetchUserById',
  async (userId) => {
    try {
      const { data } = await axios.get(`/auth/users/${userId}`)
      return data
    } catch (error) {
      console.log('Error fetching user:', error)
      throw error // Re-throw the error
    }
  }
)

export const editUserInfo = createAsyncThunk<
  string,
  UserCredentials,
  { state: RootState }
>('auth/editUserInfo', async ({ fullName, email, imageUrl }, { getState }) => {
  try {
    const { auth } = getState()
    const userId = auth.userData?._id
    const response = await axios.put(`/auth/${userId}/edit`, {
      fullName,
      email,
      imageUrl,
    })
    if (response.status === 200) {
      return 'User information updated successfully' // Success message
    } else {
      return 'An error occurred' // Handle other error cases here
    }
  } catch (error) {
    throw error // Rethrow the error for error handling
  }
})
