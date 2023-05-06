import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../axios';


export const addPostReaction = createAsyncThunk(
  'posts/addPostReaction',
  async ({ postId, reactionType }) => {
    try {
      const { data } = await instance.post(`/posts/${postId}/reaction`, {
        reactionType,
      });

      return data;
    } catch (error) {
      console.log('Error adding reaction:', error);
      throw error;
    }
  }
);

export const removePostReaction = createAsyncThunk(
  'posts/removePostReaction',
  async ({ postId, reactionType }) => {
    try {
      const { data } = await instance.delete(`/posts/${postId}/reaction`, {
        data: { reactionType },
      });

      return data;
    } catch (error) {
      console.log('Error removing reaction:', error);
      throw error;
    }
  }
);

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const reactionSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPostReaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPostReaction.fulfilled, (state, action) => {
        state.loading = false;
        const { postId, reactionType } = action.payload;
        const postIndex = state.posts.findIndex((post) => post._id === postId);

        if (postIndex !== -1) {
          // Update the post in the state
          const post = state.posts[postIndex];
          const newReactions = { ...post.reactions, [reactionType]: post.reactions[reactionType] + 1 };
          const reactedBy = post.reactions.reactedBy.includes(userId)
            ? post.reactions.reactedBy
            : [...post.reactions.reactedBy, userId];

          const updatedPost = { ...post, reactions: { ...newReactions, reactedBy } };

          state.posts.splice(postIndex, 1, updatedPost);
        }
      })
      .addCase(addPostReaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removePostReaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(removePostReaction.fulfilled, (state, action) => {
        state.loading = false;
        const { postId, reactionType } = action.payload;
        const postIndex = state.posts.findIndex((post) => post._id === postId);

        if (postIndex !== -1) {
          // Update the post in the state
          const post = state.posts[postIndex];
          const newReactions = { ...post.reactions, [reactionType]: post.reactions[reactionType] - 1 };
          const reactedBy = post.reactions.reactedBy.filter((id) => id !== userId);

          const updatedPost = { ...post, reactions: { ...newReactions, reactedBy } };
   
          state.posts.splice(postIndex, 1, updatedPost) }

  
          }
})

export const postReducer = reactionSlice.reducer;

