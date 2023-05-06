import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instance from '../../axios'
import Reactions from '../../components/Reactions'
import { selectAuthData } from './auth'

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

export const addPostReaction = createAsyncThunk(
  'posts/addPostReaction',
  async (postId, { getState }) => {
    try {
      const userId = selectAuthData(getState())?._id

      const response = await instance.put(`/likePost/${postId}`, {})

      return { postId, userId }
    } catch (error) {
      console.log('Error adding post reaction:', error)
      throw error
    }
  }
)

export const removePostReaction = createAsyncThunk(
  'posts/removePostReaction',
  async (postId, { getState }) => {
    try {
      const userId = selectAuthData(getState())?._id

      const response = await instance.delete(`/unlikePost/${postId}`)

      return { postId, userId }
    } catch (error) {
      console.log('Error removing post reaction:', error)
      throw error
    }
  }
)
const initialState = {
  posts: {
    items: [],
    reactedBy: [],
    favorites: [],
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
      .addCase(addPostReaction.pending, (state) => {
        state.posts.status = 'loading'
      })
      .addCase(addPostReaction.fulfilled, (state, action) => {
        state.posts.status = 'loaded'

        const { postId, userId } = action.payload
        const postIndex = state.posts.items.findIndex(
          (post) => post._id === postId
        )
        if (
          postIndex !== -1 &&
          !state.posts.items[postIndex].reactedBy.includes(userId)
        ) {
          state.posts.items[postIndex].reactedBy.push(userId)
        }
      })
      .addCase(addPostReaction.rejected, (state, action) => {
        state.posts.error = action.error.message
        state.posts.status = 'failed'
      })
      .addCase(removePostReaction.pending, (state) => {
        state.posts.status = 'loading'
      })
      .addCase(removePostReaction.fulfilled, (state, action) => {
        state.posts.status = 'loaded'

        const { postId, userId } = action.payload
        const postIndex = state.posts.items.findIndex(
          (post) => post._id === postId
        )
        if (postIndex !== -1) {
          state.posts.items[postIndex].reactedBy = state.posts.items[
            postIndex
          ].reactedBy.filter((id) => id !== userId)
        }
      })
      .addCase(removePostReaction.rejected, (state, action) => {
        state.posts.error = action.error.message
        state.posts.status = 'failed'
      })
  },
})

export const postReducer = postSlice.reducer

export const selectPosts = (state) => state.postReducer.posts.items
