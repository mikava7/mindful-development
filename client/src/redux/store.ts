import { configureStore } from "@reduxjs/toolkit";
import { postReducer } from "./slices/posts";
import { authReducer } from "./slices/auth";
import { commentReducer } from "./slices/commentSlice";

export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
	reducer: {
		posts: postReducer,
		auth: authReducer,
		comments: commentReducer,
	},
});
export default store;
