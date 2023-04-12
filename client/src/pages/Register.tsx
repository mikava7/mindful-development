import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegister, selectAuthStatus } from "../redux/slices/auth.ts";
import { Navigate } from "react-router-dom";

const Registration: React.FC = () => {
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
			fullName: "Irakli",
			email: "ira@example.com",
			password: "1234qwer",
		},
	});

	// Submit the register form
	const onSubmit = async (values) => {
		// Call the fetchUserData action creator and wait for the response
		const data = await dispatch(fetchRegister(values));

		if (data.payload && "token" in data.payload) {
			window.localStorage.setItem("token", data.payload.token);
		} else {
			// Otherwise, show an error message
			alert("Invalid email or password. Please try again.");
		}
	};
	if (authStatus) {
		return <Navigate to="/" />;
	}

	return (
		<section>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h2>create account</h2>
				<input
					className="field"
					label="Name"
					placeholder="Enter full name"
					{...register("fullName", { required: "Enter full name" })}
				/>
				<input
					className="field"
					label="E-Mail"
					placeholder="Enter email"
					{...register("email", { required: "Enter email" })}
				/>
				<input
					className="field"
					label="password"
					placeholder="Enter password"
					{...register("password", { required: "Enter password" })}
				/>

				<button
					// disabled={isValid}
					type="submit"
				>
					Register
				</button>
			</form>
		</section>
	);
};

export default Registration;
