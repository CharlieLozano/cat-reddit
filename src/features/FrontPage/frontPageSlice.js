import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Reddit from "../../util/Reddit";

export const fetchFrontPagePosts = createAsyncThunk(
  "frontPage/fetchFrontPage",
  async () => {
    const response = await Reddit.fetchFrontPage();
    return response;
  }
);

const initialState = {
  frontPagePosts: [],
  nextPage: "",
  prevPage: "",
  status: "idle", // 'idle' || 'loading' || 'succeeded' || 'failed'
  error: null,
};

const frontPageSlice = createSlice({
  name: "frontPage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFrontPagePosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFrontPagePosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.frontPagePosts = action.payload.children;
        state.nextPage = action.payload.after;
        state.prevPage = action.payload.before;
      })
      .addCase(fetchFrontPagePosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectFrontPagePosts = (state) => state.frontPage.frontPagePosts;

export const selectFrontPageStatus = (state) => state.frontPage.status;

export const selectFrontPageError = (state) => state.frontPage.error;

export const {} = frontPageSlice.actions;

export default frontPageSlice.reducer;
