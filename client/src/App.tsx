import { useState, useEffect } from "react";
import "./App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import CreatePost from "./pages/CreatePost";
import FullPost from "./pages/FullPost";
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
					path="/"
					element={<Home />}
				/>
				<Route
					path="/create-post"
					element={<CreatePost />}
				/>

				<Route
					path="/posts/:id"
					element={<FullPost />}
				/>
				<Route
					path="/posts/:id/edit"
					element={<CreatePost />}
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
