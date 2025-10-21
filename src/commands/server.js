const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Shows Wyvern server status information'),
    async execute(interaction) {
        try {
            // Fetch data from Wyvern server status API
            const response = await fetch('https://wyvern-server-status.williamuland12.workers.dev/');
            const data = await response.json();
            
            // Get server data (first server in the array)
            const server = data.servers[0];
            
            // Determine status emoji based on online status
            const statusEmoji = server.online ? '✅' : '❌';
            
            // Format the response message
            const message = `Server Status: ${statusEmoji} ${server.online}\nOnline: ${server.players}\nUptime: ${server.uptime}`;
            
            await interaction.reply(message);
        } catch (e) {
            console.error('Error fetching server status:', e);
            await interaction.reply('❌ Failed to fetch server status. Please try again later.');
        }
    },
};