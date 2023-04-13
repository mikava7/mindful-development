import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthStatus } from "../redux/slices/auth.ts";
import { useNavigate, Navigate, Link } from "react-router-dom";
import SimpleMDE from "react-simplemde-editor";
import instance from "../axios.ts";
import axios from "axios";
const CreatePost = () => {
	const authStatus = useSelector(selectAuthStatus);
	const navigate = useNavigate();

	const [content, setContent] = useState("");
	const [title, setTitle] = useState("");
	const [tags, setTags] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const inputFileRef = useRef(null);

	const handleChangeFile = async (event) => {
		try {
			const file = event.target.files[0];

			const formData = new FormData();

			formData.append("image", file);

			const response = await instance.post("/uploads/", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});

			setImageUrl(response.data.url);
		} catch (error) {
			console.error(error);
			alert("File upload error");
		}
	};

	const onClickRemoveImage = () => {
		setImageUrl("");
	};

	const onChange = useCallback((value) => {
		setContent(value);
	}, []);

	const options = useMemo(
		() => ({
			spellChecker: false,
			maxHeight: "100px",
			autofocus: true,
			placeholder: "Enter your text",
			status: false,
			autosave: {
				enabled: true,
				delay: 1000,
			},
		}),
		[],
	);
	const token = localStorage.getItem("token");
	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			setIsLoading(true);
			const fields = {
				title,
				content,
				imageUrl,
				tags: tags.split(",").map((tag) => tag.trim()),
			};

			const { data } = await instance.post("/posts", fields, {});

			const id = data._id;

			navigate(`/posts/${id}`);
		} catch (error) {
			console.warn(error);
			alert("Error when created post");
		}
	};
	return (
		<section>
			<button onClick={() => inputFileRef.current.click()}>Uploaded File</button>
			<input
				ref={inputFileRef}
				type="file"
				onChange={handleChangeFile}
				hidden
			/>
			{imageUrl && (
				<div>
					<button onClick={onClickRemoveImage}>Delete</button>
					<img
						src={`http://localhost:5000${imageUrl}`}
						alt="Uploaded"
					/>
				</div>
			)}
			<br />

			<input
				type="text"
				placeholder="Title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<input
				placeholder="Tags"
				value={tags}
				onChange={(e) => setTags(e.target.value)}
			/>

			<input
				value={content}
				onChange={(e) => setContent(e.target.value)}
			/>
			<div className="buttons">
				<button
					type="submit"
					onClick={onSubmit}
				>
					Create
				</button>
				<Link to="/">
					<button>Cancel</button>
				</Link>
			</div>
		</section>
	);
};
export default CreatePost;
