import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthStatus } from "../redux/slices/auth.ts";
import { useNavigate, Navigate, Link } from "react-router-dom";
import SimpleMDE from "react-simplemde-editor";
import instance from "../axios.ts";
import { useParams } from "react-router-dom";

const CreatePost = () => {
	const authStatus = useSelector(selectAuthStatus);
	const navigate = useNavigate();
	const { id } = useParams(); // extract id from URL params

	const [content, setContent] = useState("");
	const [title, setTitle] = useState("");
	const [tags, setTags] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const inputFileRef = useRef(null);
	const [data, setData] = useState([]);

	const isEditing = Boolean(id);

	const handleChangeFile = async (event) => {
		try {
			const file = event.target.files[0];

			const formData = new FormData();

			formData.append("image", file);

			const response = await instance.post("/uploads", formData);

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

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (id) {
					const { data } = await instance.get(`/posts/${id}`);

					setTitle(data.post.title);
					setContent(data.post.content);
					setImageUrl(data.post.imageUrl);
					if (data.post && data.post.tags) {
						setTags(data.post.tags.join(","));
					}
					console.log("res", data);
				}
			} catch (error) {
				console.error(error);
				alert("Failed to fetch post data.");
			}
		};

		fetchData();
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

			const { data } = isEditing
				? await instance.patch(`/posts/${id}`, fields)
				: await instance.post("/posts", fields);

			const _id = isEditing ? id : data._id;

			navigate(isEditing ? `/posts/${_id}` : `/`);

			console.log("postCreation data", `/posts/${id}`);
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

			<SimpleMDE
				value={content}
				onChange={onChange}
				options={options}
			/>

			<div className="buttons">
				<button
					type="submit"
					onClick={onSubmit}
				>
					{isEditing ? "Save" : "Create"}
				</button>
				<Link to="/">
					<button>Cancel</button>
				</Link>
			</div>
		</section>
	);
};
export default CreatePost;
