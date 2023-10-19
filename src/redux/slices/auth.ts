import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from '../../axios'
import { addFavorite } from './favoriteSlice'

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

export const fetchUserById = createAsyncThunk(
  'auth/fetchUserById',
  async (userId) => {
    try {
      const { data } = await axios.get(`/auth/users/${userId}`)
      return data
    } catch (error) {
      console.log('Error fetching user:', error)
    }
  }
)

export const editUserInfo = createAsyncThunk(
  'auth/editUserInfo',
  async ({ fullName, email, imageUrl }, { getState }) => {
    const { auth } = getState()
    const userId = auth.user._id
    try {
      const response = await axios.put(`/auth/${userId}/edit`, {
        fullName,
        email,
        imageUrl,
      })
      return { success: true, updatedUser: response.data.updatedUser }
    } catch (error) {
      console.log(error.message || 'cant get user info')
      throw error
    }
  }
)

export const editPassword = createAsyncThunk(
  'auth/editPassword',
  async ({ currentPassword, newPassword }, { getState }) => {
    const { auth } = getState()
    const userId = auth.user._id

    try {
      const response = await axios.put(`/auth/${userId}/edit-password`, {
        currentPassword,
        newPassword,
      })
      return response.data
    } catch (error) {
      console.log(error.message || 'cant change password')
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

export const getFavorites = createAsyncThunk(
  'auth/getFavorites',
  async (userId) => {
    const response = await axios.get(`/auth/favorites/${userId}`)
    return response.data.favorites
  }
)

export const addFavorites = createAsyncThunk(
  'auth/addFavorite',
  async (postId) => {
    console.log('postId in add favorite', postId)
    const response = await axios.post(`/auth/favorites/${postId}`)
    return response.data.favorites
  }
)

export const removeFavorite = createAsyncThunk(
  'auth/removeFavorite',
  async (postId) => {
    console.log('postId in remove favorite', postId)

    const response = await axios.delete(`/auth/favorites/${postId}`)
    return response.data.favorites
  }
)

export const follow = createAsyncThunk(
  'auth/follow',

  async (userId, { getState }) => {
    const dataId = getState().auth.user._id
    console.log('dataId in follow action creator', dataId)

    try {
      const { data } = await axios.post(`/auth/follow/${userId}`, null)
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

export const unFollow = createAsyncThunk(
  'auth/unFollow',

  async (userId, { getState }) => {
    const dataId = getState().auth.user._id
    console.log('dataId in unFollow action creator', dataId)

    try {
      const { data } = await axios.delete(`/auth/follow/${userId}`)
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

const initialState = {
  data: JSON.parse(localStorage.getItem('selectAuthStatus')) || null,
  user: null,
  users: [],
  userById: null,
  favorites: [],
  followers: [],
  following: [],
  starredIds: JSON.parse(localStorage.getItem('starredIds')),
  updatedUser: null,
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
    addStarredId: (state, action) => {
      state.starredIds = [...state.starredIds, action.payload]
      localStorage.setItem('starredIds', JSON.stringify(state.starredIds))
    },
    removeStarredId: (state, action) => {
      state.starredIds = state.starredIds?.filter((id) => id !== action.payload)
      localStorage.setItem('starredIds', JSON.stringify(state.starredIds))
    },
    followUser: (state, action) => {
      state.followStatus = 'success'
      state.following.push(action.payload.followingId)
      state.user.following.push(action.payload.followingId)
      state.userById.followers.push(state.user._id)
      state.followers.push(state.user._id)
    },
    unFollowUser: (state, action) => {
      state.followStatus = 'success'
      state.following = state.following.filter(
        (id) => id !== action.payload.followingId
      )
      state.user.following = state.user.following.filter(
        (id) => id !== action.payload.followingId
      )
      state.userById.followers = state.userById.followers.filter(
        (id) => id !== state.user._id
      )
      state.followers = state.followers.filter((id) => id !== state.user._id)
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

      .addCase(fetchUserById.pending, (state) => {
        // When the async thunk is pending, set the status to "loading" and clear any existing data
        state.status = 'loading'
        state.userById = null
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        // When the async thunk is fulfilled, set the status to "loaded" and update the data with the fetched data
        state.status = 'loaded'
        state.userById = action.payload
      })
      .addCase(fetchUserById.rejected, (state) => {
        // When the async thunk is rejected, set the status to "error" and clear any existing data
        state.status = 'error'
        state.userById = null
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
      .addCase(getFavorites.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.favorites = action.payload
      })
      .addCase(getFavorites.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addFavorites.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(addFavorites.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.favorites = action.payload
      })
      .addCase(addFavorites.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(removeFavorite.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.favorites = action.payload
      })
      .addCase(removeFavorite.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(editUserInfo.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(editUserInfo.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.updatedUser = action.payload
      })
      .addCase(editUserInfo.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(editPassword.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(editPassword.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(editPassword.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const selectAuthStatus = (state) => Boolean(state.auth.data)
export const selectAuthData = (state) => state.auth.data

export const { clearUserData, clearVisitedPosts } = authSlice.actions
export const { addStarredId, removeStarredId, followUser, unFollowUser } =
  authSlice.actions

// Export the auth slice
export const authReducer = authSlice.reducer
