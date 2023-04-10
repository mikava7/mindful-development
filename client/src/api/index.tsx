import axios, { AxiosResponse } from "axios";
import { PostType } from "../types/types";

const API_BASE_URL = "http://localhost:5000";

const getAllPosts = async (): Promise<PostType[]> => {
	try {
		const response: AxiosResponse<PostType[]> = await axios.get(`${API_BASE_URL}/posts`);
		return response.data;
	} catch (error) {
		console.error("Error fetching data:", error);
		return [];
	}
};

const createPost = async (postData: PostType): Promise<PostType> => {
	try {
		const response: AxiosResponse<PostType> = await axios.post(`${API_BASE_URL}/posts`, postData);
		return response.data;
	} catch (error) {
		console.error("Error creating post:", error);
		return {} as PostType;
	}
};

const updatePost = async (postId: string, postData: PostType): Promise<PostType> => {
	try {
		const response: AxiosResponse<PostType> = await axios.put(
			`${API_BASE_URL}/posts/${postId}`,
			postData,
		);
		return response.data;
	} catch (error) {
		console.error("Error updating post:", error);
		return {} as PostType;
	}
};

const deletePost = async (postId: string): Promise<boolean> => {
	try {
		const response: AxiosResponse<boolean> = await axios.delete(`${API_BASE_URL}/posts/${postId}`);
		return response.data;
	} catch (error) {
		console.error("Error deleting post:", error);
		return false;
	}
};

export { getAllPosts, createPost, updatePost, deletePost };
