import React from "react";
import TimeDate from "../util/TimeDate";

// get the props from the Posts feature. I thought this would be the best way to do it so that this component stays stateless and we can reuse it in multiple different parts of the app but we could also go through the store, let me know what you think.
const Comment = ({ data }) => {
	const { id, author, body, ups, created } = data;
  console.log(id)

	return (
		<div className="comment" id={id}>
			<h4>{author}</h4>
					{body && <p>{body}</p>}
			<div className="up-container">
				<img className="ups-img" src={require("../media/up-arrow.png")} />
				<h4>{ups}</h4>
			</div>
			<TimeDate timestamp={created} />
		</div>
	);
};

export default Comment;