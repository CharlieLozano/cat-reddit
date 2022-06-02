// helper func return json
const getJson = async (url, errorMsg = "Hmm something went wrong") => {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`${errorMsg} (${response.status})`);
	}
	return response.json();
};

const returnListing = (children) => {
	const listing = [];
	children.forEach((child) => {
		const short = child.data;
		listing.push({
			id: short.id,
			url: short.url,
			author: short.author,
			title: short.title,
			subreddit: short.subreddit,
			thumbnail: short.thumbnail,
			selftext: short.selftext,
			created: short.created_utc,
		});
	});
	return listing;
};

const filterByMedia = (response) => {
	const result = [...response.data.children].filter((child) => {
		return !child.data.is_video && child.data.is_reddit_media_domain;
	});
	return result;
};

// Reddit componenent
const Reddit = {
	async fetchHomePage(after = null) {
		// Defining the url for the fetch
		const endpoint = `https://www.reddit.com/user/outside-research4792/m/cats.json`;

		try {
			let response;
			// if we want to get the first frontpage
			if (!after) {
				response = await getJson(endpoint);
				// if we want to get any frontpage other than the first page
			} else {
				response = await getJson(`${endpoint}?count=25&after=${after}`);
			}
			const children = filterByMedia(response);
			// Make the listing array of objects
			const listing = returnListing(children);
			// Returning and object with two keys
			return {
				after: response.data.after,
				listing: listing,
			};
		} catch (err) {
			return err.message;
		}
	},

	async fetchPostPage(subreddit, id) {
		const endpoint = `https://www.reddit.com/r/${subreddit}/comments/${id}.json`;

		try {
			const response = await getJson(endpoint);

			// Creating Post Object
			let short = response[0].data.children[0].data;

			const post = {
				id: short.id,
				url: short.permalink,
				author: short.author,
				title: short.title,
				thumbnail: short.thumbnail,
				created: short.created,
			};

			// Creating Comments Array
			const comments = response[1].data.children;
			const newComments = [];

			comments.forEach((comment) => {
				short = comment.data;
				newComments.push({
					id: short.id,
					author: short.author,
					body: short.body,
					ups: short.ups,
					created: short.created,
				});
			});

			// Returning and object with two keys
			return {
				post: post,
				comments: newComments,
			};
		} catch (err) {
			return err.message;
		}
	},

	async fetchSearch(searchTerm, filters) {
		// Defining the url for the fetch
		const url = `https://www.reddit.com/user/outside-research4792/m/cats/search.json?q=`;
		let endpoint = url + searchTerm;

		try {
			//Fetching and making a copy of the childrens since it will be a destructive process
			const response = await getJson(endpoint);
			let children = filterByMedia(response);

			// Filter by filters
			filters.forEach((filter) => {
				children = children.filter((child) =>
					child.data.title.includes(filter)
				);
			});

			// Make the listing array of objects
			const listings = returnListing(children);

			// Returning and object with two keys
			return {
				after: response.after,
				listings: listings,
			};
		} catch (err) {
			return err.message;
		}
	},

	async fetchScroll(searchTerm, filters, after) {
		// Defining the url for the fetch
		const url = `https://www.reddit.com/user/outside-research4792/m/cats/search.json?q=`;
		let endpoint = url + searchTerm;

		// Checking if there's after
		if (after) {
			endpoint = `${endpoint}&after=${after}`;
		} else {
			return;
		}

		try {
			//Fetching and making a copy of the childrens since it will be a destructive process
			const response = await getJson(endpoint);
			let children = filterByMedia(response);

			// Filter by filters
			filters.forEach((filter) => {
				children = children.filter((child) =>
					child.data.title.includes(filter)
				);
			});

			// Make the listing array of objects
			const listings = returnListing(children);

			// Returning and object with two keys
			return {
				after: response.after,
				listings: listings,
			};
		} catch (err) {
			return err.message;
		}
	},
};

export default Reddit;
