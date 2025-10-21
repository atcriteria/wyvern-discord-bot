
// Keep heroku app alive
var http = require("http");
setInterval(function() {
    http.get("http://wyvern-discord-bot.herokuapp.com");
}, 300000); // every 5 minutes (300000)

// Main entry point for bot
require('dotenv').config();
const server = require('./api/server');
const port = process.env.PORT || 5000;
const token = process.env.DISCORDJS_BOT_TOKEN
// const { token } = require('../config.json')
const fs = require('node:fs');
const { Collection } = require('discord.js');
const client = require('./client');

// Deploy commands when bot starts
const deployCommands = require('./deploy_commands');

client.commands = new Collection();

const commandFiles = fs.readdirSync('src/commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('src/events').filter(file => file.endsWith('.js'));

// Handle Commands
for (const file of commandFiles){
    const command = require(`../src/commands/${file}`);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command)
}
// Handle Events
for (const file of eventFiles){
    const event = require(`../src/events/${file}`);
    if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

server.listen(port, () => console.log(`\nServer listening on port: ${port}~`))
client.login(token);