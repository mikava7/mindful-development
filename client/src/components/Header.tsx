import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
	const isAuth: boolean = false;

	const onClickLogout = () => {};

	return (
		<div className="header-container">
			<div className="header-content">
				<h1 className="header-title">Header</h1>
				<div className="header-links">
					<Link
						to="/"
						className="header-link"
					>
						Home
					</Link>
					<div className="header-auth">
						{isAuth ? (
							<>
								<Link
									to="/posts/create"
									className="header-link"
								>
									create post
								</Link>
								<button
									className="header-button"
									onClick={onClickLogout}
								>
									Logout
								</button>
							</>
						) : (
							<>
								<Link
									to="/login"
									className="header-link"
								>
									Login
								</Link>
								<Link
									to="/register"
									className="header-link"
								>
									Create account
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
