import React from "react";
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
	const onClickRemove = () => {};

	return (
		<div>
			<img
				src={item.imageUrl}
				alt={item.title}
			/>

			<div>
				<div>
					<h2>{item.title}</h2>
					<p>{item.author}</p>
					<p>{item.email}</p>
					<p>{item.content}</p>
				</div>
			</div>
		</div>
	);
};
export default Post;
