import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	selectAllPosts,
	selectPostsStatus,
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
	const nextListing = useSelector(selectNextListing);
	const subreddit = useSelector(selectPostsSubreddit);
	const searchTerm = useSelector(selectPostsSearchTerm);
	// DELETE USEEFFECTONCE AND REPLACE WITH USEEFFECT BEFORE PRODUCTION VERSION. FOR MORE INFO SEE: https://dev.to/ag-grid/react-18-avoiding-use-effect-getting-called-twice-4i9e
	useEffect(() => {
		if (postsStatus === "idle") {
			dispatch(fetchPosts({searchTerm: searchTerm, subreddit: subreddit, after: "initial"}));
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [postsStatus]);

	const fetchNextPage = () => {
		dispatch(fetchPosts({searchTerm: searchTerm, subreddit: subreddit, after: nextListing}));
	};

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
