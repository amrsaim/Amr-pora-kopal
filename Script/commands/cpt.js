const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');
const request = require('request');

module.exports.config = {
    name: '\n',
    version: '1.0.0',
    hasPermssion: 0,
    credits: 'saim-vai',
    description: 'This command is for using my bot in your group.',
    commandCategory: 'Info',
    usages: '/',
    cooldowns: 11,
    dependencies: {
        'request': '',
        'fs-extra': '',
        'axios': ''
    }
};

module.exports.run = async function({ api, event }) {
    const Stream = require('fs-extra');

    // একবারে পুরো লেখা
    const messageBody = `🌸 Assalamualaikum 🌸  
🌺 Thanks you so much for using my bot your group ❤️‍🩹  
😻 I will you are members enjoy!🤗  

☢️ To view any command 📌  
/Help  
/Bot  
/Info  

𝐁𝐨𝐭 𝐎𝐰𝐧𝐞𝐫➢ ☞︎︎︎𝐒𝐀𝐈𝐌 𝐕𝐀𝐈☜︎︎.`;

    // লোকাল ফাইল path
    const filePath = path.join(__dirname, 'cyber.jpg');

    // নতুন ইমেজ লিংকগুলো
    const images = [
        'https://i.imgur.com/7d9sjGv.jpeg',
        'https://i.imgur.com/q8nAheR.jpeg',
        'https://i.imgur.com/7d9sjGv.jpeg',
        'https://i.imgur.com/q8nAheR.jpeg',
    ];

    // র্যান্ডম ইমেজ বেছে নেওয়া
    const imageUrl = images[Math.floor(Math.random() * images.length)];
    const imageStream = request.get(encodeURI(imageUrl)).pipe(Stream.createWriteStream(filePath));

    // ইমেজ ডাউনলোড শেষ হলে মেসেজ পাঠানো
    imageStream.on('close', () => {
        api.sendMessage(
            {
                body: messageBody,
                attachment: Stream.createReadStream(filePath)
            },
            event.threadID,
            () => Stream.unlinkSync(filePath) // পাঠানোর পরে ফাইল ডিলিট
        );
    });
};
