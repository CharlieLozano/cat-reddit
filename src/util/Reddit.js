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

const constructEndpoint = (conditions) => {
	const { searchTerm , subreddit, after } = conditions
	const encodedSearchTerm = encodeURIComponent(searchTerm)
	let endpoint = 	`https://www.reddit.com/user/outside-research4792/m/cats/new.json`
	// The connector is for attaching the after to the url, there are two options: ? and &
	let connector = "?"

	if(subreddit !== "None"){
		endpoint = `https://www.reddit.com/r/${subreddit}/new.json`;
	}
	
	if(searchTerm){
		connector = '&'
		endpoint = endpoint.slice(0, endpoint.length - 8)
		endpoint += `search.json?q=${encodedSearchTerm}&restrict_sr=1&sr_nsfw=&is_multi=1&sort=new`
	}

	if(after && after !== 'initial'){
		endpoint += `${connector}count=25&after=${after}`
	}

	return endpoint;

}

// Reddit componenent
const Reddit = {
	async fetchHomePage(conditions = {}) {
		
		const { searchTerm , subreddit } = conditions
		// Builds the endpoint for the reddit fetch
		const endpoint = constructEndpoint(conditions);

		try {		
			const response = await getJson(endpoint);
			// Filters only the post with images
			const children = filterByMedia(response);
			// Make the listing array of objects
			const listing = returnListing(children);
			// Returning and object with two keys
			return {
				after: response.data.after,
				listing: listing,
				subreddit: subreddit,
				searchTerm: searchTerm
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
	}
};

export default Reddit;
