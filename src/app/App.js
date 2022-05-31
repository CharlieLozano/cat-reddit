import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import HomePage from "../pages/HomePage";
import PostPage from "../pages/PostPage";

export default function App() {
	return (
		<Router>
			<h1>Cat Reddit</h1>
			<Routes>
				<Route index path="/" element={<HomePage />} />
				<Route path=":postId" element={<PostPage />} />
			</Routes>
		</Router>
	);
}
