// COMMENTED OUT - Command unregistered
/*
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('This is a test'),
    async execute(interaction) {
        try {
            await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`)
        } catch (e) {
            console.error(e)
        }
    },
};
*/