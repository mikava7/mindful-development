import React from "react";

const Tags = ({ items }: { items: string[] }) => {
	return (
		<ul>
			{items.map((tags, i) => (
				<li key={i}>
					<div>{tags}</div>
				</li>
			))}
		</ul>
	);
};

export default Tags;
