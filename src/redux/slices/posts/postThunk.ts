import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instance from '../../../axios'
import { Post, Fields } from '../../../types/types'
import { PostDetails } from '../../../components/postdetails/PostDetails'
export const fetchPosts = createAsyncThunk<Post, void, { rejectValue: string }>(
  'posts/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get('/posts')
      return data
    } catch (error) {
      return rejectWithValue('Failed to fetch posts')
    }
  }
)

export const fetchSinglePosts = createAsyncThunk<Post, string>(
  'posts/fetchSinglePosts',
  async (id) => {
    try {
      const { data } = await instance.get(`/posts/${id}`)
      return data
    } catch (error) {
      console.log('Error fetching posts:', error)
      throw error
    }
  }
)

export const createPost = createAsyncThunk<Post, Fields>(
  'posts/createPost',
  async (fields, { rejectWithValue }) => {
    try {
      const { data } = await instance.post('/posts', fields)
      console.log('data', data)

      return data
    } catch (error) {
      // If there's an error, you can reject the promise with an error message
      return rejectWithValue('Failed to create the post: ' + error)
    }
  }
)

export const updatePost = createAsyncThunk<
  Post,
  { id: string; fields: Fields }
>('posts/updatePost', async ({ id, fields }) => {
  try {
    const { data } = await instance.put(`/posts/${id}`, fields)
    return data
  } catch (error) {
    console.log('Error updating post:', error)
    throw error
  }
})
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
interface PostDetails {
  _id: any
  postId: string
  userId: string | null
}
export const deletePost = createAsyncThunk<
  string,
  { postId: string; userId: string }
>('posts/removePost', async ({ postId, userId }) => {
  try {
    const { data } = await instance.delete(`/posts/${postId}`, {
      data: { userId },
    })
    console.log('data in thunk', data)
    return data
  } catch (error) {
    throw error
  }
})
