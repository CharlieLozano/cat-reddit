import React, { useEffect, useRef, useCallback } from "react";
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

export const Posts = () => {
	const dispatch = useDispatch();
	const allPosts = useSelector(selectAllPosts);
	const postsStatus = useSelector(selectPostsStatus);
	const postsError = useSelector(selectPostsError);
	const nextListing = useSelector(selectNextListing);

	const observer = useRef();
	const lastPostElementRef = useCallback(
		(node) => {
			if (postsStatus === "loading") return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting) {
					dispatch(fetchPosts(nextListing));
				}
			});
			if (node) observer.current.observe(node);
		},
		[postsStatus]
	);

	// DELETE USEEFFECTONCE AND REPLACE WITH USEEFFECT BEFORE PRODUCTION VERSION. FOR MORE INFO SEE: https://dev.to/ag-grid/react-18-avoiding-use-effect-getting-called-twice-4i9e
	useEffectOnce(() => {
		if (postsStatus === "idle") {
			dispatch(fetchPosts());
		}
	}, [postsStatus]);

	let content;
	if (postsStatus === "loading") {
		content = <p>Loading...</p>;
	} else if (postsStatus === "succeeded") {
		const filteredPosts = allPosts
			.slice()
			.sort((a, b) => b.created - a.created);
		content = (
			<ul className="postLink">
				{filteredPosts.map((post, index) => {
					if (index === filteredPosts.length - 1) {
						return (
							<li key={post.id}>
								<Link
									ref={lastPostElementRef}
									to={`${post.subreddit}/${post.id}`}
								>
									<Post data={post} />
								</Link>
							</li>
						);
					} else {
						return (
							<li key={post.id}>
								<Link to={`${post.subreddit}/${post.id}`}>
									<Post data={post} />
								</Link>
							</li>
						);
					}
				})}
			</ul>
		);
	}

	return <>{content}</>;
};

export default Posts;
