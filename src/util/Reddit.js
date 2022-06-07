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
	let endpoint;	
	const encodedSearchTerm = encodeURIComponent(searchTerm)

	// No searchTerm || No subreddit
	if(!searchTerm && subreddit == "None"){
		endpoint = `https://www.reddit.com/user/outside-research4792/m/cats.json`;
	
	// There is searchTerm || No subreddit
	} else if(searchTerm && subreddit == "None" ){
		const baseUrl = `https://www.reddit.com/user/outside-research4792/m/cats/search.json?q=`
		endpoint = `${baseUrl}${encodedSearchTerm}&restrict_sr=1&sr_nsfw=&is_multi=1&sort=new`;
	
	// No searchTerm || There is subreddit
	} else if(!searchTerm && subreddit != "None" ){
		endpoint = `https://www.reddit.com/r/${subreddit}/new.json`;

	// There is searchTerm || There is subreddit
	} else if(searchTerm && subreddit != "None"){
		const baseUrl = `https://www.reddit.com/r/${subreddit}/search.json?q=`
		endpoint = `${baseUrl}${encodedSearchTerm}&restrict_sr=1&sr_nsfw=&is_multi=1&sort=new`;
	}
	

	// Adding after if it exists
	// The initial after indicates that is the first fetch so it doesn't counts
	if(after && after !== "initial"){
		
		// Define the connector before ${after}
		const lastLetter = endpoint.slice(-1)
		// if it ends in .json = ?
		if(lastLetter === "n"){
			endpoint += "?"
		// if it does not ends in .json = &
		}else{
			endpoint += "&"
		}
		// add after
		endpoint += `count=25&after=${after}`
	}

	return endpoint;

}

// Reddit componenent
const Reddit = {
	async fetchHomePage(conditions = {}) {
		// Defining the url for the fetch
		
		const { searchTerm , subreddit, after } = conditions
		const endpoint = constructEndpoint(conditions);

		try {		
			const response = await getJson(endpoint);
			// if we want to get the first frontpage. this fetches it the first time as we are not passing an after parameter
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
