const { SlashCommandBuilder } = require('@discordjs/builders');
const https = require('https');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Shows Wyvern server status information'),
    async execute(interaction) {
        try {
            // Fetch data from Wyvern server status API using Node.js https module
            const data = await new Promise((resolve, reject) => {
                https.get('https://wyvern-server-status.williamuland12.workers.dev/', (res) => {
                    let data = '';
                    res.on('data', (chunk) => {
                        data += chunk;
                    });
                    res.on('end', () => {
                        try {
                            resolve(JSON.parse(data));
                        } catch (error) {
                            reject(error);
                        }
                    });
                }).on('error', (error) => {
                    reject(error);
                });
            });
            
            // Get server data (first server in the array)
            const server = data.servers[0];
            
            // Determine status emoji based on online status
            const statusEmoji = server.online ? '✅' : '❌';
            
            // Format the response message
            const message = `Server Status: ${statusEmoji}\nOnline: ${server.players}\nUptime: ${server.uptime}`;
            
            await interaction.reply(message);
        } catch (e) {
            console.error('Error fetching server status:', e);
            await interaction.reply('❌ Failed to fetch server status. Please try again later.');
        }
    },
};