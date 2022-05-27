const MULTI_PATH =
	"https://www.reddit.com/user/outside-research4792/m/cats.json";

// helper func return json
const getJson = async (url, errorMsg = "Hmm something went wrong") => {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`${errorMsg} (${response.status})`);
	}
	return response.json();
};

// Reddit componenent
const Reddit = {
	async fetchFrontPage() {
		try {
			const response = await getJson(MULTI_PATH);
			return response.data;
		} catch (err) {
			return err.message;
		}
	},
};

export default Reddit;
