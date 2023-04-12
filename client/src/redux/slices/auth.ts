import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

// Create an async thunk to fetch user data
export const fetchLogin = createAsyncThunk("auth/fetchLogin", async (params) => {
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

export const fetchRegister = createAsyncThunk("auth/fetchRegister", async (params) => {
	try {
		// Make a POST request to the /auth/login endpoint with the provided params
		const { data } = await axios.post("/auth/register", params);

		// Return the fetched data
		return data;
	} catch (error) {
		// If an error occurs, log it to the console and re-throw the error
		console.log("Error fetching posts:", error);
		throw error;
	}
});

export const fetchUserData = createAsyncThunk("auth/fetchUserData", async () => {
	try {
		// Make a POST request to the /auth/login endpoint with the provided params
		const { data } = await axios.get("/auth/user-info");

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
	reducers: {
		clearUserData: (state) => {
			state.data = null;
		},
	},

	// Define extra reducers to handle the state updates when the async thunk is pending, fulfilled, or rejected
	extraReducers: (builder) => {
		builder
			.addCase(fetchLogin.pending, (state) => {
				// When the async thunk is pending, set the status to "loading" and clear any existing data
				state.status = "loading";
				state.data = null;
			})
			.addCase(fetchLogin.fulfilled, (state, action) => {
				// When the async thunk is fulfilled, set the status to "loaded" and update the data with the fetched data
				state.status = "loaded";
				state.data = action.payload;
			})
			.addCase(fetchLogin.rejected, (state) => {
				// When the async thunk is rejected, set the status to "error" and clear any existing data
				state.status = "error";
				state.data = null;
			})

			.addCase(fetchUserData.pending, (state) => {
				// When the async thunk is pending, set the status to "loading" and clear any existing data
				state.status = "loading";
				state.data = null;
			})
			.addCase(fetchUserData.fulfilled, (state, action) => {
				// When the async thunk is fulfilled, set the status to "loaded" and update the data with the fetched data
				state.status = "loaded";
				state.data = action.payload;
			})
			.addCase(fetchUserData.rejected, (state) => {
				// When the async thunk is rejected, set the status to "error" and clear any existing data
				state.status = "error";
				state.data = null;
			})
			.addCase(fetchRegister.pending, (state) => {
				// When the async thunk is pending, set the status to "loading" and clear any existing data
				state.status = "loading";
				state.data = null;
			})
			.addCase(fetchRegister.fulfilled, (state, action) => {
				// When the async thunk is fulfilled, set the status to "loaded" and update the data with the fetched data
				state.status = "loaded";
				state.data = action.payload;
			})
			.addCase(fetchRegister.rejected, (state) => {
				// When the async thunk is rejected, set the status to "error" and clear any existing data
				state.status = "error";
				state.data = null;
			});
	},
});

export const selectAuthStatus = (state) => Boolean(state.auth.data);
export const selectAuthError = (state) => state.auth.status === "error";

export const { clearUserData } = authSlice.actions;

// Export the auth slice
export const authReducer = authSlice.reducer;
