import React, { useEffect } from "react";
import { useEffectOnce } from "../../util/HelperFunc";
import { useDispatch, useSelector } from "react-redux";
import {
	selectAllPosts,
	selectPostsStatus,
	selectPostsError,
	fetchPosts,
} from "./postsSlice";
import Post from "../../components/Post";
import { Link } from "react-router-dom";

export const Posts = () => {
	const dispatch = useDispatch();
	const allPosts = useSelector(selectAllPosts);
	const postsStatus = useSelector(selectPostsStatus);
	const postsError = useSelector(selectPostsError);

	// DELETE USEEFFECTONCE AND REPLACE WITH USEEFFECT BEFORE PRODUCTION VERSION. FOR MORE INFO SEE: https://dev.to/ag-grid/react-18-avoiding-use-effect-getting-called-twice-4i9e
	useEffectOnce(() => {
		if (postsStatus === "idle") {
			dispatch(fetchPosts());
		}
	}, [postsStatus]);

	return (
		<ul className="postLink">
			{/* if there are posts in state map over them and return a list of Post components which are shown on the front page */}
			{allPosts &&
				allPosts.map((post) => {
					return (
						<li key={post.id}>
							<Link to={`${post.subreddit}/${post.id}`}>
								<Post data={post} />
							</Link>
						</li>
					);
				})}
		</ul>
	);
};

export default Posts;
