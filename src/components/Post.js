import React from "react";

const Post = (props) => {
	const { title, url, subreddit, selftext } = props;
	return (
		<div className="post">
			<h2>{title}</h2>
			<img className="post-img" src={url} />
			{selftext && <p>{selftext}</p>}
			<h3>r/{subreddit}</h3>
		</div>
	);
};

export default Post;
