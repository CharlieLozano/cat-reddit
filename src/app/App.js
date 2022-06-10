import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import React from "react";
import HomePage from "../pages/HomePage";
import PostPage from "../pages/PostPage";

export default function App() {
	return (
		<Router>
				<header>
					<Link to={"/"}>
						<h1>Cat Reddit</h1>
					</Link>
					<a href="https://github.com/CharlieLozano/cat-reddit" target="_blank" rel="noreferrer">
						<img
							src={require('../media/reddit-logo.png')}
							alt="example"
						/>
					</a>
				</header>
			<Routes>
				<Route index path="/" element={<HomePage />} />
				<Route path="/:subreddit/:postId" element={<PostPage />} />
			</Routes>
		</Router>
	);
}
