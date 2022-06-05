import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Reddit from "../../util/Reddit";

export const fetchPosts = createAsyncThunk(
	"posts/fetchPosts",
	async (conditions) => {
		const response = await Reddit.fetchHomePage(conditions);
		return response;
	}
);

export const fetchSearch = createAsyncThunk("posts/fetchSearch", async (searchConditions) => {
	const { searchTerm, subreddit } = searchConditions
	const response = await Reddit.fetchSearch(searchTerm, subreddit);

	return response;
});

const initialState = {
	listing: [],
	after: "",
	// My thinking here is that the status doesn't need to be a loading Boolean, it can equally be a string to reflect the status of the fetch request
	status: "idle", // 'idle' || 'loading' || 'succeeded' || 'failed' || 'last'
	// Same with the error status, it doesn't need to be a boolean, it can be a message which is the action.payload of the error message.
	error: null,
	searchTerm: "",
	subreddit: "None"

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
			// set the status to last if it is the last page
			.addCase(fetchPosts.fulfilled, (state, action) => {
				/////////////////////////////////////
				////// Subject to be deleted
				// if (action.payload.after === "") {
				// 	state.status = "last";
				// } else {
				// 	state.status = "succeeded";
				// }
				//////////////////////////////////////
				if(state.searchTerm !== action.payload.searchTerm || state.subreddit !== action.payload.subreddit){
					state.listing = []
				}
				action.payload.listing.forEach((child) => state.listing.push(child));
				state.before = action.payload.before;
				state.after = action.payload.after;
				state.subreddit = action.payload.subreddit;
				state.searchTerm = action.payload.searchTerm;
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
	},
});

export const selectPreviousListing = (state) => state.posts.before;
export const selectNextListing = (state) => state.posts.after;
export const selectAllPosts = (state) => state.posts.listing;
export const selectPostsStatus = (state) => state.posts.status;
export const selectPostsError = (state) => state.posts.error;
export const selectPostsSearchTerm = (state) => state.posts.searchTerm;
export const selectPostsSubreddit = (state) => state.posts.subreddit;

export default postsSlice.reducer;
