const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const fs = require('fs');
const writeStream = fs.createWriteStream('devBlog.csv');

const port = 4000;

const app = express();

//write headers
writeStream.write(`Item name, Link \n`);

axios.get('https://www.w3schools.com/jquery/jquery_hide_show.asp')
    .then(res => {
        const $ = cheerio.load(res.data)
        $('.w3-bar, .w3-left').each((index, element) => {

            const itemName = $(element).find('w3-bar-item').text();
            const Link = $(element).find('a').attr('href');
            const dev = 'https://www.w3schools.com/jquery/'
            const joinedBlogLink = `${dev}` + `${Link}`;
            writeStream.write(`\n Item name : ${itemName} ,\n Link: ${joinedBlogLink} \n`);
        });


    }).catch(err => console.error(err))

//Listen to server
app.listen(port, () => {
    console.log(`Server Established and  running on Port ⚡${port}`)
})