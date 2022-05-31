import React from "react";

// get the props from the Posts feature. I thought this would be the best way to do it so that this component stays stateless and we can reuse it in multiple different parts of the app but we could also go through the store, let me know what you think.
const Post = ({ data }) => {
	const { title, url, subreddit, selftext } = data;
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
