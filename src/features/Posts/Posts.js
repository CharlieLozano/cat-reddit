import React, { useState, useEffect, useRef, useCallback } from "react";
import { useEffectOnce } from "../../util/HelperFunc";
import { useDispatch, useSelector } from "react-redux";
import {
	selectAllPosts,
	selectPostsStatus,
	selectPostsError,
	fetchPosts,
	selectNextListing,
} from "./postsSlice";
import Post from "../../components/Post";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

export const Posts = () => {
	const dispatch = useDispatch();
	const allPosts = useSelector(selectAllPosts);
	const postsStatus = useSelector(selectPostsStatus);
	const postsError = useSelector(selectPostsError);
	const nextListing = useSelector(selectNextListing);
	const [lastPost, setLastPost] = useState(false);
	// DELETE USEEFFECTONCE AND REPLACE WITH USEEFFECT BEFORE PRODUCTION VERSION. FOR MORE INFO SEE: https://dev.to/ag-grid/react-18-avoiding-use-effect-getting-called-twice-4i9e
	useEffectOnce(() => {
		if (postsStatus === "idle") {
			dispatch(fetchPosts());
		}
	}, [postsStatus]);

	const fetchNextPage = () => {
		dispatch(fetchPosts(nextListing));
	};
	if (postsStatus === "last") {
		setLastPost(true);
	}

	const content = allPosts.map((post) => {
		return (
			<li key={post.id}>
				<Link to={`${post.subreddit}/${post.id}`}>
					<Post data={post} />
				</Link>
			</li>
		);
	});

	return (
		<ul className="postLink">
			<InfiniteScroll
				dataLength={content.length}
				next={fetchNextPage}
				loader={<h4>Loading...</h4>}
				hasMore={!lastPost}
				endMessage={
					<p style={{ textAlign: "center" }}>
						<b>Yay! You have seen it all</b>
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
