import React from "react";

const Post = (props) => {
	const { title, url, subreddit, selftext } = props;
	return (
		<div>
			<h2>{title}</h2>
			<img src={url} />
			{selftext && <p>{selftext}</p>}
			<h3>{subreddit}</h3>
		</div>
	);
};

export default Post;
