import { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form";
import Posts from "./components/post/Posts";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, selectAuthStatus } from "./redux/slices/auth.ts";
import { Routes, Route } from "react-router-dom";
function App() {
	const dispatch = useDispatch();
	const authStatus = useSelector(selectAuthStatus);

	useEffect(() => {
		dispatch(fetchUserData());
	}, []);

	return (
		<div className="App">
			<Header />
			<Routes>
				<Route
					path="/header"
					element={<Header />}
				/>
				<Route
					path="/"
					element={<Home />}
				/>

				<Route
					path="/form"
					element={<Form />}
				/>
				<Route
					path="/posts"
					element={<Posts />}
				/>
				<Route
					path="/login"
					element={<Login />}
				/>
				<Route
					path="/register"
					element={<Register />}
				/>
			</Routes>
		</div>
	);
}

export default App;
