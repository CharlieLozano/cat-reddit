import React, { useState, useEffect, useRef, useCallback } from "react";
import { useEffectOnce } from "../../util/HelperFunc";
import { useDispatch, useSelector } from "react-redux";
import {
	selectAllPosts,
	selectPostsStatus,
	selectPostsError,
	fetchPosts,
	selectNextListing,
	selectPostsSearchTerm,
	selectPostsSubreddit
} from "./postsSlice";
import Post from "../../components/Post";
import { Link } from "react-router-dom";
// this is a dependency which I added to the project, you can find out more about it here https://www.npmjs.com/package/react-infinite-scroll-component
import InfiniteScroll from "react-infinite-scroll-component";

export const Posts = () => {
	const dispatch = useDispatch();
	const allPosts = useSelector(selectAllPosts);
	const postsStatus = useSelector(selectPostsStatus);
	const postsError = useSelector(selectPostsError);
	const nextListing = useSelector(selectNextListing);
	const subreddit = useSelector(selectPostsSubreddit);
	const searchTerm = useSelector(selectPostsSearchTerm);
	// this state is needed so that the infinite scroll knows when the last page is
	const [lastPage, setLastPage] = useState(false);
	// DELETE USEEFFECTONCE AND REPLACE WITH USEEFFECT BEFORE PRODUCTION VERSION. FOR MORE INFO SEE: https://dev.to/ag-grid/react-18-avoiding-use-effect-getting-called-twice-4i9e
	useEffectOnce(() => {
		if (postsStatus === "idle") {
			dispatch(fetchPosts({searchTerm: searchTerm, subreddit: subreddit, after: "initial"}));
		}
	}, [postsStatus]);

	const fetchNextPage = () => {
		dispatch(fetchPosts({searchTerm: searchTerm, subreddit: subreddit, after: nextListing}));
	};
	///////////////////////////
	//// Subject to be deleted
	// if (postsStatus === "last") {
	// 	setLastPage(true);
	// }
	// no need to sort this any more as we now fetch by new. See Reddit.fetchFrontPage
	///////////////////////////
	const content = allPosts.map((post) => {
		return (
			<li key={post.id + Date.now()}>
				<Link to={`${post.subreddit}/${post.id}`}>
					<Post data={post} />
				</Link>
			</li>
		);
	});
	// see documentation for info about the InfiniteScroll componant
	return (
		<ul className="postLink">
			<InfiniteScroll
				dataLength={content.length}
				next={fetchNextPage}
				loader={<h4>Loading...</h4>}
				hasMore={nextListing}
				endMessage={
					<p style={{ textAlign: "center" }}>
						{allPosts.length === 0 ? <b>Oops! No results</b> : <b>Yay! You have seen it all</b>}
					</p>
				}
				scrollableTarget="postLink"
			>
				{content}
			</InfiniteScroll>
		</ul>
	);
};

export default Posts;
