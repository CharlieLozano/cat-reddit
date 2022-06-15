import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/Posts/postsSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});
