export interface PostType {
	_id: string;
	title: string;
	author: string;
	content: string;
	category?: string;
	tags?: string[];
	viewCount: number;
	imageUrl?: string;
	createdAt: string;
	updatedAt: string;
}

export interface UserType {
	_id: string;
	username: string;
	email: string;
	password: string;
	createdAt: string;
	updatedAt: string;
}
