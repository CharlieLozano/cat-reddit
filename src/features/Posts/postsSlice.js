import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Reddit from "../../util/Reddit";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
	const response = await Reddit.fetchPosts();
	return response;
});

const initialState = {
	posts: {},
	before: "",
	after: "",
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
				state.posts.posts = action.payload.children;
				state.nextPage = action.payload.after;
				state.prevPage = action.payload.before;
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export const selectAllPosts = (state) => state.posts.posts.posts;

export const selectPostsStatus = (state) => state.posts.status;

export const selectPostsError = (state) => state.posts.error;

export const {} = postsSlice.actions;

export default postsSlice.reducer;
