import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instance from '../../axios'
import Reactions from '../../components/Reactions'
import { selectAuthData } from './auth'
import { Post, Favorites } from '../../types/types'
import { RootState } from '../store'
import type { PayloadAction } from '@reduxjs/toolkit'
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
export const deletePost = createAsyncThunk<string, string>(
  'posts/removePost',
  async (postId) => {
    try {
      await instance.delete(`/posts/${postId}`)

      // // Remove post ID from the user's favorites array
      // const user = JSON.parse(localStorage.getItem('AuthData'))
      // const updatedFavorites =
      //   user && user.favorites
      //     ? user.favorites.filter((fav) => fav.post !== postId)
      //     : []
      // localStorage.setItem(
      //   'AuthData',
      //   JSON.stringify({ ...user, favorites: updatedFavorites })
      // )

      return postId
    } catch (error) {
      throw error
    }
  }
)

// export const addPostReaction = createAsyncThunk(
//   'posts/addPostReaction',
//   async (postId, { getState }) => {
//     try {
//       const userId = selectAuthData(getState())?._id

//       const response = await instance.put(`/likePost/${postId}`, {})

//       return { postId, userId }
//     } catch (error) {
//       console.log('Error adding post reaction:', error)
//       throw error
//     }
//   }
// )

// export const removePostReaction = createAsyncThunk(
//   'posts/removePostReaction',
//   async (postId: string, { getState }) => {
//     try {
//       const userId: string = selectAuthData(getState())?._id

//       const response = await instance.delete(`/unlikePost/${postId}`)

//       return { postId, userId }
//     } catch (error) {
//       console.log('Error removing post reaction:', error)
//       throw error
//     }
//   }
// )
interface PostState {
  items: Post[]
  reactedBy: string[]
  status: string
  error: string | null
}
const initialState: PostState = {
  items: [],
  reactedBy: [],
  status: 'idle',
  error: null,
}

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.items = []
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.items = action.payload
        state.status = 'succeeded'
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.items = []
        state.status = 'error'
      })

      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter((post) => post._id !== action.payload)
        state.status = 'succeeded'
      })
      .addCase(updateViewCount.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message as string | null
      })
    // .addCase(addPostReaction.pending, (state) => {
    //   state.status = 'loading'
    // })
    // .addCase(addPostReaction.fulfilled, (state, action) => {
    //   state.status = 'succeeded'

    //   const { postId, userId } = action.payload
    //   const postIndex = state.items.findIndex((post) => post._id === postId)
    //   if (
    //     postIndex !== -1 &&
    //     !state.items[postIndex].reactedBy.includes(userId)
    //   ) {
    //     state.items[postIndex].reactedBy.push(userId)
    //   }
    // })
    // .addCase(addPostReaction.rejected, (state, action) => {
    //   state.error = action.error.message as string | null
    //   state.status = 'failed'
    // })
    // .addCase(removePostReaction.pending, (state) => {
    //   state.status = 'loading'
    // })
    // .addCase(removePostReaction.fulfilled, (state, action) => {
    //   state.status = 'succeeded'

    //   const { postId, userId } = action.payload
    //   const postIndex = state.items.findIndex((post) => post._id === postId)
    //   console.log('userId', userId)
    //   console.log('Type of userId', userId)

    //   if (postIndex !== -1) {
    //     state.items[postIndex].reactedBy = state.items[
    //       postIndex
    //     ].reactedBy.filter((id) => {
    //       console.log('Type of id:', typeof id) // Add this line to check the type
    //       return id !== userId
    //     })
    //   }
    // })
    // .addCase(removePostReaction.rejected, (state, action) => {
    //   state.error = action.error.message as string | null
    //   state.status = 'failed'
    // })
  },
})

export const selectPosts = (state: RootState) => state.posts.items
export const postReducer = postSlice.reducer
