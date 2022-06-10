import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useEffectOnce } from "../util/HelperFunc";
import Reddit from "../util/Reddit";
import Post from '../components/Post'
import Comment from '../components/Comment'

const PostPage = () => {
	const params = useParams()
	const [post, setPost] = useState()
	const [comments, setComments] = useState([])
	const { subreddit, postId } = params
	// console.log("This is post")
	// console.log(post)
	// console.log(comments)

	const fetchPostAndComments = async () => {
		const response = await  Reddit.fetchPostPage(subreddit, postId)
		if(response.post){
			setPost({...response.post})
			setComments(response.comments)
		}
		
	}

	// Before build, use useEffect() instead
	useEffectOnce(() => {
		fetchPostAndComments()
	}, [])

	const commentsList = () => {
		const commentKeys = Object.keys(comments)

		if(comments.length === 0){
			return <h4>No comments</h4>
		}

		const listOfComments = commentKeys.map(comment => {
			return(
				<li key={comments[comment].id}>
					<Comment data={comments[comment]}/>
				</li>
			)
		})

		return(
			<div className="comments">
				<h3>Comments</h3>
				{listOfComments}
			</div>
		)
	}

	return (
		<div>
			{ post ? <Post data={post}/> : <h4>Post not found</h4>	}
			{ post ? commentsList() : null }
		</div>
	);
};

export default PostPage;
