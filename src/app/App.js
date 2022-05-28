import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import { Posts } from "../features/Posts/Posts";

export default function App() {
	return (
		<Router>
			<h1>Hello</h1>
			<Routes>{/*<Route path='/' element={<HomePage/>}/>*/}</Routes>
			<Posts />
		</Router>
	);
}
