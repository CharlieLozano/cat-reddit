import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: {
    },
    before: "",
    after: "",
    loading: false,
    error: false,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {

  }
});

// export const selectAllPosts = (state) => state.cards.cards;
// export const { functions } = cardsSlice.actions;

export default postsSlice.reducer;
