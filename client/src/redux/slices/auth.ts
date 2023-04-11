import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

// Create an async thunk to fetch user data
export const fetchUserData = createAsyncThunk("auth/fetchUserData", async (params) => {
	try {
		// Make a POST request to the /auth/login endpoint with the provided params
		const { data } = await axios.post("/auth/login", params);

		// Return the fetched data
		return data;
	} catch (error) {
		// If an error occurs, log it to the console and re-throw the error
		console.log("Error fetching posts:", error);
		throw error;
	}
});

// Define the initial state of the auth slice
const initialState = {
	data: null,
	status: "loading",
};

// Define the auth slice
const authSlice = createSlice({
	name: "auth",
	initialState,
	// Define extra reducers to handle the state updates when the async thunk is pending, fulfilled, or rejected
	extraReducers: {
		[fetchUserData.pending]: (state) => {
			// When the async thunk is pending, set the status to "loading" and clear any existing data
			state.status = "loading";
			state.data = null;
		},
		[fetchUserData.fulfilled]: (state, action) => {
			// When the async thunk is fulfilled, set the status to "loaded" and update the data with the fetched data
			state.status = "loaded";
			state.data = action.payload;
		},
		[fetchUserData.rejected]: (state) => {
			// When the async thunk is rejected, set the status to "error" and clear any existing data
			state.status = "error";
			state.data = null;
		},
	},
});

export const selectAuthStatus = (state) => state.auth.status;

// Export the auth slice
export const authReducer = authSlice.reducer;
