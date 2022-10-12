const axios = require('axios');
var cheerio = require('cheerio');

var baseUrl = 'https://www.geeksforgeeks.org/what-is-web-scraping-and-how-to-use-it/';

// (async () => {

//     try {
//         let homePageLinks = await getLinksFromURL(baseUrl)
//         console.log(homePageLinks);
//     } catch (e) { console.log(e); }

// })();



async function getLinksFromURL(url) {

    try {
        let links = [];
        let httpResponse = await axios.get(url);

        let $ = cheerio.load(httpResponse.data);
        let linkObjects = $('img'); // get all hyperlinks

        linkObjects.each((index, element) => {
            links.push({
                alt: $(element).attr('alt'), // get the text
                src: $(element).attr('src'), // get the href attribute
            });
        });

        return links;
    } catch (e) { console.log(e) }

}

module.exports = {getLinksFromURL}