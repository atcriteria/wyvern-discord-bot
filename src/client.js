// The main client for the bot.

const { Client, Intents} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILDS], partials: ['MESSAGE', 'CHANNEL', 'REACTION']});

module.exports = client;