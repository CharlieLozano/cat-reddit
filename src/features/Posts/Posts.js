import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	selectAllPosts,
	selectPostsStatus,
	selectPostsError,
} from "./postsSlice";

const FrontPage = () => {
	const dispatch = useDispatch();
	const allPosts = useSelector(selectAllPosts);
	const postsStatus = useSelector(selectPostsStatus);
	const postsError = useSelector(selectPostsError);

	useEffect(() => {
		if (postsStatus === "idle") {
			dispatch(fetchFrontPagePosts());
		}
	}, [dispatch, postsStatus]);

	return <div>FrontPage</div>;
};

export default FrontPage;
