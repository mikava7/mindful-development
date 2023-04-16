import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../axios.ts";
import Post from "../components/post/Post";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../redux/slices/posts";
import ReactMarkdown from "react-markdown";
const FullPost = () => {
	const dispatch = useDispatch();
	const { id } = useParams(); // extract id from URL params
	const { posts } = useSelector((state) => state.posts) || {};
	const isPostsLoading = posts.status === "loading";
	const post = Array.isArray(posts.items) ? posts.items.find((p) => p._id === id) : null;

	const onClickRemove = (postId) => {
		dispatch(deletePost(postId));
	};
	return isPostsLoading ? (
		<div>Loading...</div>
	) : (
		<div>
			{post ? (
				<>
					<Post
						key={post._id}
						_id={post._id}
						title={post.title}
						content={post.content}
						createdAt={post.createdAt}
						imageUrl={`http://localhost:5000${post.imageUrl}`}
						author={post.author.fullName}
						viewCount={post.viewCount}
						tags={post.tags}
						onClickRemove={() => onClickRemove(post._id)}
					/>
					<ReactMarkdown children={post.content} />
				</>
			) : (
				<p>Post not found</p>
			)}
		</div>
	);
};

export default FullPost;
