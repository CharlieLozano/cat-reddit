import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";

export default function App() {
	return (
		<Router>
			<h1>Hello</h1>
			<Routes>{/*<Route path='/' element={<HomePage/>}/>*/}</Routes>
		</Router>
	);
}
