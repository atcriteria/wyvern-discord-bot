const fs = require('node:fs')
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
// const { clientId, guildId, token } = require('../config.json');
const clientId = process.env.DISCORDJS_CLIENTID;
const guildId = process.env.DISCORDJS_GUILDID;
const token = process.env.DISCORDJS_BOT_TOKEN;

const commands = [];
const commandFiles = fs.readdirSync('src/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles){
    const command = require(`../src/commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands},
        );
        console.log('Successfully reloaded application (/) commands.');
    } catch (e) {
        console.error(e);
    }
})();