import { configureStore } from "@reduxjs/toolkit";
import frontPageReducer from "../features/FrontPage/frontPageSlice";

export const store = configureStore({
  reducer: {
    frontPage: frontPageReducer,
  },
});
