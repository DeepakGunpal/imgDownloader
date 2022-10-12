

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { getLinksFromURL } = require('.');

var baseUrl = 'https://www.geeksforgeeks.org/what-is-web-scraping-and-how-to-use-it/';



const downloadFile = async (fileUrl, outputLocationPath) => {
    try {
        const data = await axios.head(fileUrl);
        if (data || data.status == 200) {
            if (data.headers["content-length"] <= 10 * 1048576) {
                const response = await axios({
                    method: "get",
                    url: fileUrl,
                    responseType: "stream",
                });

                return new Promise((resolve, reject) => {
                    try {
                        const writer = fs.createWriteStream(outputLocationPath);
                        writer.on("error", (err) => {
                            console.log("downloadFileFn writer error called → ", err);
                            error = err;
                            writer.close();
                            resolve(false);
                        });
                        writer.on("close", () => {
                            if (!error) {
                                resolve(true);
                            }
                        });
                        response.data.pipe(writer);
                        let error = null;
                    } catch (err) {
                        reject(err);
                    }
                });
            }
        }
        return false;
    } catch (err) {
        console.log('************ Error in Image Processing: downloadFileFn ************', err?.message);
        throw err;
    }
};

const handleImageDownload = async (files) => {
    try {
        if (!files) return;
        let filePath = './';
        let fileName;
        let isFileUpload;
        let fileData = [];
        for (let i = 0; i < files.length; i++) {
            if (i >= 10) break;
            fileName = `image-IDK-${uuidv4()}.jpg`;
            const fileImagePath = path.resolve(filePath, fileName);
            isFileUpload = await downloadFile(files[i], fileImagePath);
            if (isFileUpload) {
                fileData.push(fileName);
            }
        }
        return fileData;
    } catch (err) {
        throw err;
    }
};

(async () => {

    try {
        let homePageLinks = await getLinksFromURL(baseUrl)
        console.log(homePageLinks);
        const files = homePageLinks.map(file => file.src).filter(file => file !== '');
        console.log('files:', files);
        // const files = ['https://media.geeksforgeeks.org/wp-content/cdn-uploads/20200622222131/What-is-Web-Scraping-and-How-to-Use-It.png',
        // 'https://media.geeksforgeeks.org/wp-content/post-ads-banner/2022-07-18-12-36-53-image (5).png',
        // 'https://media.geeksforgeeks.org/wp-content/post-ads-banner/2021-12-29-11-18-16-DSA_Ad_icon (1).png',
        // 'https://media.geeksforgeeks.org/wp-content/post-ads-banner/2021-12-29-16-30-50-CIP_Icon.png'];

        handleImageDownload(files).then((res) => {
            console.log('res :', res);
        })
            .catch((err) => {
                console.log('err :', err)
            })
    } catch (e) { console.log(e); }

})();
