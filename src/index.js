const express = require('express');
const https = require('https');
// const http = require('http');
const fs = require('fs');
const path = require('path');
const { getLinksFromURL } = require('./getLinks');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/getImage', async (req, res) => {
    try {
        const baseUrl = req.body.url;
        let homePageLinks = await getLinksFromURL(baseUrl)
        const files = homePageLinks.filter(file => {
            return file.src !== '' && file.src.split(':')[0] === 'https'
        })
        if (files.length === 0) return res.status(200).send({ status: true, message: 'No files found' });
        for (let i = 0; i < files.length; i++) {

            const fileName = path.basename(files[i].src) || Date.now();

            const file = fs.createWriteStream(__dirname + '/files/' + fileName);

            https.get(files[i].src, function (response) {
                response.pipe(file);
                // after download completed close filestream
                file.on("finish", () => {
                    file.close();
                    console.log("Download Completed");
                });
            });
        }
        res.status(200).send({ status: true, message: "Download complete" });
    } catch (e) {
        console.log(e.message);
        res.status(400).send({ status: false, message: e.message });
    }
})

app.listen(5000, () => console.log('listening on port 5000'))