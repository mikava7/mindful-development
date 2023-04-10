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

export const Post: React.FC<PostProps> = ({
	_id,
	title,
	createdAt,
	imageUrl,
	user,
	viewsCount,
	commentsCount,
	tags,
	children,
	isFullPost,
	isLoading,
	isEditable,
}) => {
	const onClickRemove = () => {};

	return (
		<div>
			{imageUrl && (
				<img
					src={imageUrl}
					alt={title}
				/>
			)}
			<div>
				<UserInfo
					{...user}
					additionalText={createdAt}
				/>
				<div>
					<h2>{isFullPost ? title : <li>{title}</li>}</h2>
					<ul>
						{tags.map((name) => (
							<li key={name}>#{name}</li>
						))}
					</ul>
					{children && <div>{children}</div>}
					<ul>
						<li>
							<span>{viewsCount}</span>
						</li>
						<li>
							<span>{commentsCount}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};
