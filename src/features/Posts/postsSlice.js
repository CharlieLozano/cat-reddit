import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Reddit from "../../util/Reddit";

export const fetchPosts = createAsyncThunk(
	"posts/fetchPosts",
	async (nextListing) => {
		const response = await Reddit.fetchHomePage(nextListing);
		return response;
	}
);

const initialState = {
	listing: [],
	after: "",
	before: "",
	// My thinking here is that the status doesn't need to be a loading Boolean, it can equally be a string to reflect the status of the fetch request
	status: "idle", // 'idle' || 'loading' || 'succeeded' || 'failed'
	// Same with the error status, it doesn't need to be a boolean, it can be a message which is the action.payload of the error message.
	error: null,
};

const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPosts.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.status = "succeeded";
				action.payload.listing.forEach((child) => state.listing.push(child));
				state.before = action.payload.before;
				state.after = action.payload.after;
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export const selectPreviousListing = (state) => state.posts.before;
export const selectNextListing = (state) => state.posts.after;
export const selectAllPosts = (state) => state.posts.listing;
export const selectPostsStatus = (state) => state.posts.status;
export const selectPostsError = (state) => state.posts.error;

export default postsSlice.reducer;
