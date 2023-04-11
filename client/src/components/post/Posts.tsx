import React, { useEffect, useState } from "react";
import { getAllPosts } from "../../api/index";

const Posts = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		async function fetchData() {
			try {
				const posts = await getAllPosts();
				setPosts(posts);
			} catch (error) {
				console.error(error);
			}
		}

		fetchData();
	}, []);

	return (
		<div>
			{/* {posts.map((post) => (
				<div key={post._id}>
					<h2>{post.title}</h2>
					<p>{post.content}</p>
					<p>{post.email}</p>
				</div>
			))} */}
		</div>
	);
};

export default Posts;
