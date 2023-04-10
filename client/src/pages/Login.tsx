import React from "react";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
	return (
		<div>
			<form>
				<label>
					E-Mail:
					<input
						className="field"
						type="email"
						name="email"
						required
					/>
				</label>
				<label>
					Password:
					<input
						className="field"
						type="password"
						name="password"
						required
					/>
				</label>
				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default Login;
