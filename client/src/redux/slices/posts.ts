import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instance from '../../axios'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const { data } = await instance.get('/posts')
    return data
  } catch (error) {
    console.log('Error fetching posts:', error)
    throw error
  }
})
export const fetchSinglePosts = createAsyncThunk(
  'posts/fetchSinglePosts',
  async () => {
    try {
      const { data } = await instance.get(`/posts/${id}`)
      return data
    } catch (error) {
      console.log('Error fetching posts:', error)
      throw error
    }
  }
)
export const updateViewCount = createAsyncThunk(
  'posts/updateViewCount',
  async (postId) => {
    try {
      const { data } = await instance.put(`/posts/${postId}`)
      return data
    } catch (error) {
      console.log('Error updating view count:', error)
      throw error
    }
  }
)
export const deletePost = createAsyncThunk(
  'posts/removePost',
  async (postId) => {
    try {
      await instance.delete(`/posts/${postId}`)

      // Remove post ID from user's favorites array
      const user = JSON.parse(localStorage.getItem('AuthData'))
      const updatedFavorites =
        user && user.favorites
          ? user.favorites.filter((fav) => fav.post !== postId)
          : []
      localStorage.setItem(
        'AuthData',
        JSON.stringify({ ...user, favorites: updatedFavorites })
      )

      return postId
    } catch (error) {
      console.log('Error removing post:', error)
      throw error
    }
  }
)

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  try {
    const { data } = await instance.get('/tags/last5')
    return data
  } catch (error) {
    console.log('Error fetching tags:', error)
    throw error
  }
})

const initialState = {
  posts: {
    items: [],

    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
}

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.posts.items = []
        state.posts.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts.items = action.payload
        state.posts.status = 'loaded'
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.posts.items = []
        state.posts.status = 'error'
      })
      .addCase(fetchTags.pending, (state) => {
        state.tags.items = []
        state.tags.status = 'loading'
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.tags.items = action.payload
        state.tags.status = 'loaded'
      })
      .addCase(fetchTags.rejected, (state) => {
        state.tags.items = []
        state.tags.status = 'error'
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts.items = state.posts.items.filter(
          (post) => post._id !== action.payload
        )
        state.posts.status = 'loaded'
      })
      .addCase(updateViewCount.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const postReducer = postSlice.reducer

export const selectPosts = (state) => state.postReducer.posts.items
