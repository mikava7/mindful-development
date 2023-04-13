import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Form from "../components/Form";
import Posts from "../components/post/Posts";
import Post from "../components/post/Post";
import Tags from "../pages/Tags";
import axios from "../axios.ts";
import { fetchPosts, fetchTags } from "../redux/slices/posts";

const Home = () => {
	const [data, setData] = useState("");
	const [isLoading, setIsLoading] = useState("");

	const { id } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (id) {
					const response = await axios.get(`/posts/${id}`);
					setData(response.data);
				}
			} catch (error) {
				console.log(error);
				alert("Cannot get post.");
			}
		};
		fetchData();
	}, [id]);

	console.log("data in home", data);
	const dispatch = useDispatch();

	const { posts, tags } = useSelector((state) => state.posts) || {};
	const userData = useSelector((state) => state.auth.data) || {};

	const isPostsLoading = posts.status === "loading";
	const isTagsLoading = tags.status === "loading";
	useEffect(() => {
		dispatch(fetchPosts());
	}, []);

	useEffect(() => {
		dispatch(fetchTags());
	}, []);

	return (
		<div>
			<div>
				{(isPostsLoading ? [Array(5)] : posts.items).map((item, index) => {
					return isPostsLoading ? (
						<Post
							key={index}
							isLoading={true}
						/>
					) : (
						<Post
							key={item._id}
							id={item._id}
							title={item.title}
							content={item.content}
							createdAt={item.createdAt}
							imageUrl={item.imageUrl}
							author={item.author.fullName}
							viewCount={item.viewCount}
							tags={item.tags}
							isEditable={userData?._id === item.author?._id}
						/>
					);
				})}
			</div>
			<div>
				<Tags
					items={tags.items}
					isLoading={isTagsLoading}
				/>
			</div>
		</div>
	);
};

export default Home;
