import React from "react";

interface UserInfoProps {
	avatarUrl: string;
	fullName: string;
	additionalText: string;
}

export const UserInfo: React.FC<UserInfoProps> = ({ avatarUrl, fullName, additionalText }) => {
	return (
		<div>
			<img
				src={avatarUrl || "/noavatar.png"}
				alt={fullName}
			/>
			<div>
				<span>{fullName}</span>
				<span>{additionalText}</span>
			</div>
		</div>
	);
};
