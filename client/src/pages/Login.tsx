import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, selectAuthStatus } from "../redux/slices/auth.ts";
import { Navigate } from "react-router-dom";
interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
	// Select the authentication status from the Redux store
	const authStatus = useSelector(selectAuthStatus);

	// Get the dispatch function from the Redux store
	const dispatch = useDispatch();

	// Use the useForm hook to handle form submission and validation
	const {
		register,
		handleSubmit,
		setError,
		formState: { error, isValid },
	} = useForm({
		defaultValues: {
			email: "irakli@example.com",
			password: "1234qwer",
		},
	});

	// Define the onSubmit function to dispatch the fetchUserData action with the form values
	const onSubmit = (values) => {
		dispatch(fetchUserData(values));
	};

	// If the authentication status is "loaded", redirect the user to the home page
	if (authStatus === "loaded") {
		return <Navigate to="/" />;
	}

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label>
					E-Mail:
					<input
						className="field"
						type="email"
						name="email"
						{...register("email", { required: "Enter email" })}
					/>
				</label>
				<label>
					Password:
					<input
						className="field"
						type="password"
						name="password"
						{...register("password", { required: "Enter password" })}
					/>
				</label>
				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default Login;
