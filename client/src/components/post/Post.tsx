import React, { useState } from "react";
import { UserInfo } from "../UserInfo";

interface PostProps {
	_id: string;
	title: string;
	createdAt: string;
	imageUrl?: string;
	user: UserInfo;
	viewsCount: number;
	commentsCount: number;
	tags: string[];
	children?: React.ReactNode;
	isFullPost: boolean;
	isLoading?: boolean;
	isEditable?: boolean;
}

const Post: React.FC<PostProps> = (item) => {
	const [expanded, setExpanded] = useState(false);

	const formattedDate = new Date(item.createdAt).toLocaleDateString("en-US", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	let content = item.content;
	if (!content) {
		content = "No content available";
	}

	const postContent = expanded ? (
		<p className="content">{content}</p>
	) : (
		<p>{content.slice(0, 100)}...</p>
	);

	const toggleReadMore = () => {
		setExpanded(!expanded);
	};

	const readMoreButton = expanded ? (
		<button onClick={toggleReadMore}>Read less</button>
	) : (
		<button onClick={toggleReadMore}>Read more</button>
	);

	return (
		<div className="post-container">
			<div>
				<h2 className="title">{item.title}</h2>
				{postContent} {readMoreButton}
				<img
					className="image-container"
					src={item.imageUrl}
					alt={item.title}
				/>
			</div>
			<div>
				<div className="post-details">
					<p className="author">{item.author}</p>
					<p className="time">{formattedDate}</p>
					<p className="viewCount">Views: {item.viewCount}</p>
				</div>
			</div>
		</div>
	);
};

export default Post;
