import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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

	const goBackContainer = () =>{
		return(		
			<Link to={"/"}>	
				<div className="about-container">
						
							<span className="go-back">Go Back</span>
						
				</div>
			</Link>
		)
	}

	// Before build, use useEffect() instead
	useEffect(() => {
		fetchPostAndComments()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div>
			{ post ? goBackContainer() : null	}
			{ post ? <Post data={post}/> : <h4>Post not found</h4>	}
			{ post ? <Comments comments={comments} /> : null }
		</div>
	);
};

export default PostPage;
