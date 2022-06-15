import * as React from 'react';
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import App from "../app/App";


// test("uses jsdom in this test file", () => {
// 	const element = document.createElement("div");
// 	expect(element).not.toBeNull();
// });

// test("renders hello h1", () => {
// 	const { getByText } = render(
// 		<Provider store={store}>
// 			<App />
// 		</Provider>
// 	);
// 	expect(getByText(/hello/i)).toBeInTheDocument();
// });

test("renders content", ()=>{
    const component = render(<Provider store={store}><App /></Provider>)
})