import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import axios from '../../../axios'

export const fetchTags = createAsyncThunk<string[]>(
  'tags/fetchTags',
  async () => {
    try {
      const { data } = await axios.get('/tags/last5')
      return data
    } catch (error) {
      console.log('Error fetching tags:', error)
      throw error
    }
  }
)
interface tagState {
  tags: string[]
  status: string
  error: string | null
}
const initialState: tagState = {
  tags: [],
  status: 'idle',
  error: null,
}

const tagSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(
        fetchTags.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          // When the async thunk is fulfilled, set the status to 'fulfilled' and update the user data with the fetched data
          state.status = 'fulfilled'
          state.tags = action.payload
        }
      )
      .addCase(fetchTags.rejected, (state, action) => {
        // When the async thunk is rejected, set the status to 'rejected' and clear any existing user data
        state.status = 'rejected'
        state.error = action.payload as string | null
      })
  },
})

export const selectTags = (state: RootState) => state.tags.tags
export const selectTagsLoading = (state: RootState) => state.tags.status
export const selectTagsErrorState = (state: RootState) => state.tags.error

export const tagsReducer = tagSlice.reducer
