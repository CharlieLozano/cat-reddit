import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Reddit from "../util/Reddit";
import Post from '../components/Post'
import Comments from '../components/Comments'

const PostPage = () => {
	const params = useParams()
	const [post, setPost] = useState()
	const [comments, setComments] = useState([])
	const { subreddit, postId } = params

	const fetchPostAndComments = async () => {
		const response = await  Reddit.fetchPostPage(subreddit, postId)
		if(response.post){
			setPost({...response.post})
			setComments(response.comments)
		}
	}

	// Before build, use useEffect() instead
	useEffect(() => {
		fetchPostAndComments()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div>
			{ post ? <Post data={post}/> : <h4>Post not found</h4>	}
			{ post ? <Comments comments={comments} /> : null }
		</div>
	);
};

export default PostPage;
