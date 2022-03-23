const express = require('express');

const server = express();

server.use(express.json());
server.get('/', (req, res) => {
    res.json({
        title: "The Wyvern Discord Channel Bot API interface.",
        message: "There are no endpoints configured for this bot. Message Archanine#7227 about installing a bot in your own server."
    })
});

module.exports = server;