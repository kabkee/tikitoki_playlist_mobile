const axios = require("axios");
const cheerio = require("cheerio");
const urls = require("./fetch_urls.js");
const fs = require("fs");

// console.info('urls', urls);

async function main() {
	const dataSet = [];

	await Promise.all(
		urls.map(async (fetchUrl) => {
			const pageHTML = await axios.get(fetchUrl);
			const $ = cheerio.load(pageHTML.data);

			const data = {
				title: $(
					"#wrap > div.page-video > div.inner > div > h2:nth-child(1) > span"
				).text(),
				subTitle: $(
					"#wrap > div.page-video > div.inner > div > h2:nth-child(2) > span"
				).text(),
				link: fetchUrl,
				videoUrl: $("#player_container > div > iframe").attr("src"),
			};
            let query = data.videoUrl.split('/')
            query = query[query.length-1];
            const videoId = query.split("?")[0]
            data.thumb = `https://vumbnail.com/${videoId}.jpg`

			dataSet.push(data);
		})
	);

	console.info("dataSet", dataSet.length);

    const naturalCollator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
	dataSet.sort((a, b) => naturalCollator.compare(a.title, b.title));

	const fsResult = await fs.writeFileSync(
		"data.js",
		"export default " + JSON.stringify(dataSet)
	);
	console.info("fsResult", fsResult);
}
main();
