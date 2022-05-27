import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    comments: {
    },
    //outerArguments: ''
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
      
  }
});

// export const selectAllComments = (state) => state.cards.cards;
// export const { functions } = cardsSlice.actions;

export default commentsSlice.reducer;
