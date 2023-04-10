import React from "react";

const Registration: React.FC = () => {
	return (
		<section>
			<h2>create account</h2>
			<input
				className="field"
				label="Name"
			/>
			<input
				className="field"
				label="E-Mail"
			/>
			<input
				className="field"
				label="password"
			/>
			<button>Register</button>
		</section>
	);
};

export default Registration;
