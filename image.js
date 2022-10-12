const http = require('https'); // or 'https' for https:// URLs
const fs = require('fs');

const file = fs.createWriteStream("file.jpg");
const request = http.get("http://i3.ytimg.com/vi/J---aiyznGQ/mqdefault.jpg", function(response) {
   response.pipe(file);

   // after download completed close filestream
   file.on("finish", () => {
       file.close();
       console.log("Download Completed");
   });
});

// https://www.geeksforgeeks.org/what-is-web-scraping-and-how-to-use-it/'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20200622222131/What-is-Web-Scraping-and-How-to-Use-It.png',
// 'https://media.geeksforgeeks.org/auth/profile/fjl8qjfnquu09b62zkrl',
// 'https://media.geeksforgeeks.org/wp-content/post-ads-banner/2022-07-18-12-36-53-image (5).png',
// 'https://media.geeksforgeeks.org/wp-content/post-ads-banner/2021-12-29-11-18-16-DSA_Ad_icon (1).png',
// 'https://media.geeksforgeeks.org/wp-content/post-ads-banner/2021-12-29-16-30-50-CIP_Icon.png'

// 'https://media.geeksforgeeks.org/gfg-gg-logo.svg',
//   'https://media.geeksforgeeks.org/wp-content/cdn-uploads/write_ndi_20210312.svg',
//   'https://media.geeksforgeeks.org/wp-content/cdn-uploads/practice_ndi_20210312.svg',
//   'https://media.geeksforgeeks.org/wp-content/cdn-uploads/premium_ndi_20210312.svg',
//   'https://media.geeksforgeeks.org/wp-content/cdn-uploads/jobs_ndi_20210312.svg'
