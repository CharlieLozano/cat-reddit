import { parseISO, formatDistanceToNow } from "date-fns";

import React, { useState } from "react";

// the below function sets the post time of each post relative to the current time i.e. ("9 hours ago" NOT 2022/06/01 - 7am)
const TimeDate = ({ timestamp }) => {
	const [timeAgo, setTimeAgo] = useState("");
	// if timeAgo is not in the state
	if (!timeAgo) {
		// get a new date relative to current timezone but also in 1970 as this is epoch time!
		const date = new Date(0);
		// update this date with the amount of seconds since 1970
		date.setUTCSeconds(timestamp);
		// get the amount of time since date that this was ago
		const timePeriod = formatDistanceToNow(date);
		// set the state with the time ago
		setTimeAgo(`${timePeriod} ago`);
	}
	// return a timeAgo stamp for each post
	return (
		<span title={timestamp} className="timestamp">
			&nbsp; <i>{timeAgo}</i>
		</span>
	);
};

export default TimeDate;
