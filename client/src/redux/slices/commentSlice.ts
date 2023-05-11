import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instance from '../../axios'

// Async thunk to fetch comments for a specific post
export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId) => {
    try {
      const { data } = await instance.get(`/posts/${postId}/comments`)
      return data
    } catch (error) {
      console.log('Error fetching comments:', error)
      throw error
    }
  }
)

// Async thunk to add a comment to a specific post
export const addComment = createAsyncThunk(
  'comments/addComment',
  async ({ postId, content, author }) => {
    try {
      const { data } = await instance.post(`/posts/${postId}/comments`, {
        postId,
        content,
        author,
      })

      return data
    } catch (error) {
      console.log('Error adding comment:', error)
      throw error
    }
  }
)

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async ({ postId, _id }) => {
    try {
      await instance.delete(`/posts/${postId}/comments/${_id}`)
      return postId
    } catch (error) {
      console.log('Error removing post:', error)
      throw error
    }
  }
)

// Initial state of the comment slice
const initialState = {
  comments: [],
  status: 'loading',
}

// Create the comment slice with reducers
const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Case for when the fetchComments thunk is pending
    builder.addCase(fetchComments.pending, (state) => {
      state.status = 'loading'
    })
    // Case for when the fetchComments thunk is fulfilled
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.comments = action.payload
    })
    // Case for when the fetchComments thunk is rejected
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
    // Case for when the addComment thunk is fulfilled
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.comments.push(action.payload)
    })
    // Case for when the deleteComment thunk is fulfilled
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.comments = state.comments.filter(
        (comment) => comment._id !== action.payload
      )
    })
  },
})

export const commentReducer = commentSlice.reducer
