import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  async (userId) => {
    try {
      const { data } = await axios.get(`/posts/favorites/${userId}`)

      return data
    } catch (error) {
      console.log(error)
      throw error
    }
  }
)

export const addFavorite = createAsyncThunk(
  'favorites/addFavorite',
  async (postId, { getState }) => {
    const { data } = getState().auth
    console.log('data', data)
    console.log('data id', data.id)

    try {
      const response = await axios.post(`/posts/favorites/${postId}`, {
        author: data.id,
        postId,
      })
      return response.data
    } catch (error) {
      console.log(error.message && "can't add favorite")
      throw error
    }
  }
)

export const removeFavorite = createAsyncThunk(
  'favorites/removeFavorite',
  async (postId, { getState }) => {
    const { data } = getState().auth

    try {
      const response = await axios.delete(`/posts/favorites/${postId}`, {
        author: data.id,
        postId,
      })
      return response.data
    } catch (error) {
      console.log(error.message && "can't remove favorite")
      throw error
    }
  }
)

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: [],
    starredIds: JSON.parse(localStorage.getItem('starredIds')),
    status: 'loading',
    error: null,
  },
  reducers: {
    addStarredId: (state, action) => {
      state.starredIds = [...state.starredIds, action.payload]
      localStorage.setItem('starredIds', JSON.stringify(state.starredIds))
    },
    removeStarredId: (state, action) => {
      state.starredIds = state.starredIds.filter((id) => id !== action.payload)
      localStorage.setItem('starredIds', JSON.stringify(state.starredIds))
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addFavorite.pending, (state) => {
        state.status = 'loading'
        state.favorites = []
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.status = 'loaded'
        state.favorites.push(action.payload)
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(removeFavorite.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.favorites = state.favorites.favorites.filter(
          (favorite) => favorite._id !== action.payload
        )
      })
      .addCase(removeFavorite.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(fetchFavorites.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.favorites = action.payload
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export const { addStarredId, removeStarredId } = favoritesSlice.actions

export default favoritesSlice.reducer
