import React, { useState } from "react";
import { createPost, updatePost, deletePost } from "../api/index";

const Form = () => {
	const [formData, setFormData] = useState({
		title: "",
		content: "",
		email: "",
		category: "",
		tags: "",
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			await createPost(formData);
			alert("Post created successfully!");
		} catch (error) {
			console.error(error);
			alert("An error occurred while creating the post.");
		}
	};

	const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			await updatePost(formData);
			alert("Post updated successfully!");
		} catch (error) {
			console.error(error);
			alert("An error occurred while updating the post.");
		}
	};

	const handleDelete = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			await deletePost(formData._id);
			alert("Post deleted successfully!");
		} catch (error) {
			console.error(error);
			alert("An error occurred while deleting the post.");
		}
	};

	return (
		<div>
			<h2>Create Post</h2>
			<form onSubmit={handleSubmit}>
				<label>
					Title:
					<input
						type="text"
						name="title"
						value={formData.title}
						onChange={handleChange}
					/>
				</label>
				<br />
				<label>
					Content:
					<textarea
						name="content"
						value={formData.content}
						onChange={handleChange}
					/>
				</label>
				<br />
				<label>
					Email:
					<input
						type="text"
						name="email"
						value={formData.email}
						onChange={handleChange}
					/>
				</label>
				<br />
				<label>
					Category:
					<input
						type="text"
						name="category"
						value={formData.category}
						onChange={handleChange}
					/>
				</label>
				<br />
				<label>
					Tags:
					<input
						type="text"
						name="tags"
						value={formData.tags}
						onChange={handleChange}
					/>
				</label>
				<br />
				<button type="submit">Create Post</button>
			</form>
			<hr />
			<h2>Update Post</h2>
			<form onSubmit={handleUpdate}>
				<label>
					ID:
					<input
						type="text"
						name="_id"
						value={formData._id}
						onChange={handleChange}
					/>
				</label>
				<br />
				<label>
					Title:
					<input
						type="text"
						name="title"
						value={formData.title}
						onChange={handleChange}
					/>
				</label>
				<br />
				<label>
					Content:
					<textarea
						name="content"
						value={formData.content}
						onChange={handleChange}
					/>
				</label>
				<br />
				<label>
					Email:
					<input
						type="text"
						name="email"
						value={formData.email}
						onChange={handleChange}
					/>
				</label>
			</form>
		</div>
	);
};
export default Form;
