import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin, selectAuthStatus, selectAuthError } from "../redux/slices/auth.ts";
import { Navigate } from "react-router-dom";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
	const authError = useSelector(selectAuthError);
	const authStatus = useSelector(selectAuthStatus);
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isValid },
		reset,
	} = useForm({
		defaultValues: {
			email: "irakli@example.com",
			password: "1234qwer",
		},
	});

	// Submit the login form
	const onSubmit = async (values) => {
		// Call the fetchUserData action creator and wait for the response
		const data = await dispatch(fetchLogin(values));

		// If the response contains a token, set it in local storage
		if (data.payload && "token" in data.payload) {
			window.localStorage.setItem("token", data.payload.token);
		} else {
			// Otherwise, show an error message
			alert("Invalid email or password. Please try again.");
		}
	};

	// Handle errors from the auth slice
	React.useEffect(() => {
		if (authError) {
			setError("auth", {
				type: "manual",
				message: authError.message,
			});
			reset({ ...errors, password: "" });
		}
	}, [authError]);

	if (authStatus) {
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
						placeholder="Enter email"
						{...register("email", { required: "Enter email" })}
					/>
				</label>
				{errors.email && <p>{errors.email.message}</p>}
				<label>
					Password:
					<input
						className="field"
						type="password"
						name="password"
						placeholder="Enter password"
						{...register("password", { required: "Enter password" })}
					/>
				</label>
				{errors.password && <p>{errors.password.message}</p>}
				{errors.auth && <p>{errors.auth.message}</p>}
				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default Login;
