// postSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
	try {
		const { data } = await instance.get("/posts");

		return data;
	} catch (error) {
		console.log("Error fetching posts:", error);
		throw error;
	}
});
export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
	try {
		const { data } = await instance.get("/tags/last5");

		return data;
	} catch (error) {
		console.log("Error fetching tags:", error);
		throw error;
	}
});

const initialState = {
	posts: {
		items: [],
		status: "loading",
	},
	tags: {
		items: [],
		status: "loading",
	},
};

const postSlice = createSlice({
	name: "posts",
	initialState,
	reducer: {},
	extraReducers: {
		[fetchPosts.pending]: (state) => {
			state.posts.items = [];

			state.posts.status = "loading";
		},
		[fetchPosts.fulfilled]: (state, action) => {
			state.posts.items = action.payload;
			state.posts.status = "loaded";
		},
		[fetchPosts.rejected]: (state) => {
			state.posts.items = [];
			state.posts.status = "error";
		},

		[fetchTags.pending]: (state) => {
			state.tags.items = [];
			state.tags.status = "loading";
		},
		[fetchTags.fulfilled]: (state, action) => {
			state.tags.items = action.payload;
			state.tags.status = "loaded";
		},
		[fetchTags.rejected]: (state) => {
			state.tags.items = [];
			state.tags.status = "error";
		},
	},
});

export const postReducer = postSlice.reducer;
