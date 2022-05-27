import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "../src/app/App";
import "@testing-library/jest-dom";

test("use jsdom in this test file", () => {
	const element = document.createElement("div");
	expect(element).not.toBeNull();
});
test("renders hello h1", () => {
	const { getByText } = render(
		<Provider store={store}>
			<App />
		</Provider>
	);

	expect(getByText(/hello/i)).toBeInTheDocument();
});
