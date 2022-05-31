import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import React from "react";
import HomePage from "../pages/HomePage";
import PostPage from "../pages/PostPage";

export default function App() {
	return (
		<Router>
			<Link to={"/"}>
				<h1>Cat Reddit</h1>
			</Link>
			<Routes>
				<Route index path="/" element={<HomePage />} />
				<Route path=":postId" element={<PostPage />} />
			</Routes>
		</Router>
	);
}
