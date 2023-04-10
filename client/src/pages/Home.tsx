import React from "react";
import Form from "../components/Form";
import Posts from "../components/post/Posts";
import { Link } from "react-router-dom";
const Home = () => {
	return (
		<div>
			<Form />
			<Posts />
		</div>
	);
};

export default Home;
