import React from "react";

export const PostSkeleton = () => {
	return (
		<div>
			<div
				style={{
					width: "100%",
					height: 300,
					backgroundColor: "#ddd",
					marginBottom: 20,
				}}
			/>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					marginBottom: 20,
				}}
			>
				<div
					style={{
						width: 40,
						height: 40,
						borderRadius: "50%",
						backgroundColor: "#ddd",
						marginRight: 10,
					}}
				/>
				<div>
					<div
						style={{
							width: 60,
							height: 20,
							backgroundColor: "#ddd",
							marginBottom: 5,
						}}
					/>
					<div
						style={{
							width: 100,
							height: 15,
							backgroundColor: "#ddd",
						}}
					/>
				</div>
			</div>
			<div>
				<div
					style={{
						width: "80%",
						height: 45,
						backgroundColor: "#ddd",
						marginBottom: 10,
					}}
				/>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						width: "40%",
						marginBottom: 10,
					}}
				>
					<div style={{ width: 40, height: 30, backgroundColor: "#ddd" }} />
					<div style={{ width: 40, height: 30, backgroundColor: "#ddd" }} />
					<div style={{ width: 40, height: 30, backgroundColor: "#ddd" }} />
				</div>
			</div>
		</div>
	);
};
