import React, { useState } from "react";
import { UserInfo } from "../UserInfo";
import { Link } from "react-router-dom";
import { PostSkeleton } from "../../components/PostSkeleton";
import { onsubmit } from "../../pages/CreatePost";
import { useDispatch, useSelector } from "react-redux";

const Post: React.FC<PostProps> = ({
	_id,
	title,
	createdAt,
	imageUrl,
	author,
	viewCount,
	tags,
	children,
	isFullPost,
	isLoading,
	isEditable,
	content,
	onClickRemove,
}) => {
	const [expanded, setExpanded] = useState(false);
	const dispatch = useDispatch();
	const formattedDate = createdAt
		? new Date(createdAt).toLocaleDateString("en-US", {
				day: "numeric",
				month: "long",
				year: "numeric",
		  })
		: "Invalid Date";

	if (!content) {
		content = "No content available";
	}

	const postContent = expanded ? (
		<p className="content">{content}</p>
	) : (
		<p>{content.slice(0, 100)}...</p>
	);

	const handleRemove = () => {
		onClickRemove(_id);
	};

	if (isLoading) {
		return <PostSkeleton />;
	}

	return (
		<div className="post-container">
			{isEditable && (
				<div className="edit-buttons">
					<Link to={`/posts/${_id}/edit`}>Edit</Link>
					<button onClick={handleRemove}>delete</button>{" "}
				</div>
			)}
			<div>
				{isFullPost ? (
					<div>
						<p> {title}</p>
					</div>
				) : (
					<Link to={`/posts/${_id}`}>{title}</Link>
				)}
				<img
					src={imageUrl}
					alt={title}
				/>
			</div>

			<div>
				<div>
					{" "}
					{postContent}
					<button onClick={() => setExpanded(!expanded)}>
						{expanded ? "read less" : "read more"}
					</button>
				</div>

				<div className="post-details">
					<p className="author">{author}</p>
					<p className="time">{formattedDate}</p>
					<p className="viewCount">Views: {viewCount}</p>
				</div>
			</div>
		</div>
	);
};

export default Post;
