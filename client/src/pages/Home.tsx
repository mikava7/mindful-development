import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Form from "../components/Form";
import Posts from "../components/post/Posts";
import Post from "../components/post/Post";
import Tags from "../pages/Tags";
import axios from "../axios.ts";
import { fetchPosts, fetchTags, deletePost } from "../redux/slices/posts";

const Home = () => {
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

	const onClickRemove = (postId) => {
		dispatch(deletePost(postId));
	};

	const filteredPosts = posts.items.filter((item) => item !== undefined);
	return (
		<div>
			<div>
				{(isPostsLoading ? [Array(5)] : filteredPosts).map((obj, index) => {
					return isPostsLoading ? (
						<Post
							key={index}
							isLoading={true}
						/>
					) : (
						<Post
							key={obj._id}
							_id={obj._id}
							title={obj.title}
							content={obj.content}
							createdAt={obj.createdAt}
							imageUrl={`http://localhost:5000${obj.imageUrl}`}
							author={obj.author.fullName}
							viewCount={obj.viewCount}
							tags={obj.tags}
							isEditable={userData?._id === obj.author?._id}
							onClickRemove={() => onClickRemove(obj._id)}
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
