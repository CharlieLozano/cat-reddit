import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	selectAllPosts,
	selectPostsStatus,
	selectPostsError,
	fetchPosts,
} from "./postsSlice";

const Posts = () => {
	const dispatch = useDispatch();
	const allPosts = useSelector(selectAllPosts);
	const postsStatus = useSelector(selectPostsStatus);
	const postsError = useSelector(selectPostsError);

	useEffect(() => {
		if (postsStatus === "idle") {
			dispatch(fetchPosts());
		}
		console.log(allPosts);
	}, [dispatch, postsStatus]);

	return <div>Posts</div>;
};

export default Posts;
