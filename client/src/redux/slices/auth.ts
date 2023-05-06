import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

// Create an async thunk to fetch user data
export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async (params) => {
    try {
      // Make a POST request to the /auth/login endpoint with the provided params
      const { data } = await axios.post('/auth/login', params)
      // Return the fetched data
      return data
    } catch (error) {
      // If an error occurs, log it to the console and re-throw the error
      console.log(error.message || 'cant login')
      throw error
    }
  }
)

export const fetchRegister = createAsyncThunk(
  'auth/fetchRegister',
  async (params) => {
    try {
      // Make a POST request to the /auth/login endpoint with the provided params
      const { data } = await axios.post('/auth/register', params)

      // Return the fetched data
      return data
    } catch (error) {
      // If an error occurs, log it to the console and re-throw the error
      console.log(error.message || 'cant register')
      throw error
    }
  }
)

export const fetchUserData = createAsyncThunk(
  'auth/fetchUserData',
  async () => {
    try {
      // Make a POST request to the /auth/login endpoint with the provided params
      const response = await axios.get('/auth/user-info')
      const user = response.data
      return user
    } catch (error) {
      // If an error occurs, log it to the console and re-throw the error
      console.log(error.message || 'cant authenticate')
      throw error
    }
  }
)

export const VisitedPosts = createAsyncThunk(
  'posts/VisitedPosts',
  async (userId) => {
    console.log('userData in VisitedPosts', userId)

    try {
      const { data } = await axios.get(`/posts/${userId}/visited`)
      return data
    } catch (error) {
      console.log('Error fetching posts:', error)
      throw error
    }
  }
)

export const getVisitedPosts = createAsyncThunk(
  'posts/getVisitedPosts',
  async (_, { getState }) => {
    try {
      // console.log('get visited', getState().auth.data) // Add this line to check the value being returned
      const { data } = await axios.get(
        `/auth/${getState().auth.data._id}/history`
      )
      return data
    } catch (error) {
      console.log('Error fetching visited posts:', error)
      throw error
    }
  }
)

export const clearHistory = createAsyncThunk(
  'posts/clearHistory',

  async (_, { getState }) => {
    try {
      console.log('history', getState().auth.data)
      const response = await axios.put(
        `/auth/${getState().auth.data._id}/clear-history`
      )
      return response.data
    } catch (error) {
      console.log('Error fetching visited posts:', error)
      throw error
    }
  }
)

const initialState = {
  data: JSON.parse(localStorage.getItem('selectAuthStatus')) || null,
  user: null,
  VisitedPosts: [],
  status: 'loading',
}

// Define the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.data = null
      window.localStorage.removeItem('selectAuthStatus')
      state.VisitedPosts = []
    },
  },

  // Define extra reducers to handle the state updates when the async thunk is pending, fulfilled, or rejected
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        // When the async thunk is pending, set the status to "loading" and clear any existing data
        state.status = 'loading'
        state.data = null
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        // When the async thunk is fulfilled, set the status to "loaded" and update the data with the fetched data
        state.status = 'loaded'
        state.data = action.payload

        // Set the authData in localStorage
        if (state.data && 'token' in state.data) {
          window.localStorage.setItem(
            'selectAuthStatus',
            JSON.stringify(state.data.token)
          )
        }
      })
      .addCase(fetchLogin.rejected, (state) => {
        // When the async thunk is rejected, set the status to "error" and clear any existing data
        state.status = 'error'
        state.data = null
      })

      .addCase(fetchUserData.pending, (state) => {
        // When the async thunk is pending, set the status to "loading" and clear any existing data
        state.status = 'loading'
        state.user = null
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        // When the async thunk is fulfilled, set the status to "loaded" and update the data with the fetched data
        state.status = 'loaded'
        state.user = action.payload
      })
      .addCase(fetchUserData.rejected, (state) => {
        // When the async thunk is rejected, set the status to "error" and clear any existing data
        state.status = 'error'
        state.user = null
      })
      .addCase(fetchRegister.pending, (state) => {
        // When the async thunk is pending, set the status to "loading" and clear any existing data
        state.status = 'loading'
        state.data = null
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        // When the async thunk is fulfilled, set the status to "loaded" and update the data with the fetched data
        state.status = 'loaded'
        state.data = action.payload
      })
      .addCase(fetchRegister.rejected, (state) => {
        // When the async thunk is rejected, set the status to "error" and clear any existing data
        state.status = 'error'
        state.data = null
      })
      .addCase(VisitedPosts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(VisitedPosts.fulfilled, (state, action) => {
        state.status = 'loaded'
        state.VisitedPosts.push(action.payload)
      })
      .addCase(getVisitedPosts.pending, (state) => {
        // When the async thunk is pending, set the status to "loading" and clear any existing data
        state.status = 'loading'
        state.VisitedPosts = []
      })
      .addCase(getVisitedPosts.fulfilled, (state, action) => {
        // When the async thunk is pending, set the status to "loading" and clear any existing data
        state.status = 'loaded'
        state.VisitedPosts = action.payload
      })
      .addCase(clearHistory.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(clearHistory.fulfilled, (state) => {
        state.status = 'succeeded'
        state.VisitedPosts = []
      })
      .addCase(clearHistory.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const selectAuthStatus = (state) => Boolean(state.auth.data)
export const selectAuthData = (state) => state.auth.data

export const { clearUserData, clearVisitedPosts } = authSlice.actions

// Export the auth slice
export const authReducer = authSlice.reducer
