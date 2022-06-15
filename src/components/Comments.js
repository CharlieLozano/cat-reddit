import React from "react";
import Comment from './Comment'

// get the props from the Posts feature. I thought this would be the best way to do it so that this component stays stateless and we can reuse it in multiple different parts of the app but we could also go through the store, let me know what you think.
const Comments = ({ comments }) => {

  const commentsList = (comments) => {
		const commentKeys = Object.keys(comments)

		if(comments.length === 0){
			return <h4>No comments</h4>
		}

		const createList = commentKeys.map(comment => {
			return(
				<li key={comments[comment].id}>
					<Comment data={comments[comment]}/>
				</li>
			)
		})

		return(
			<div className="comments">
				<h3>Comments</h3>
				{createList}
			</div>
		)
	}

	return commentsList(comments);
};

export default Comments;