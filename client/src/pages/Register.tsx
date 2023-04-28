import React from "react";
import styled from "styled-components";
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
		<RegistrationContainer>
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
					type="submit"
				>
					Register
				</button>
			</form>
		</RegistrationContainer>
	);
};

export default Registration;

const RegistrationContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    
    input {
      margin-bottom: 1rem;
      padding: 0.5rem;
      border-radius: 0.5rem;
      border: 1px solid #4267B2;
      font-size: 1rem;
      width: 100%;
    }
    
    button {
      background-color: #4267B2;
      color: #fff;
      border-radius: 0.25rem;
      border: none;
      font-size: 1rem;
      padding: 0.5rem;
      width: 100%;
    }
  }
`;