// COMMENTED OUT - Command unregistered
/*
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('echo')
    .setDescription('Replies with your input!')
    .addStringOption(option => option.setName('input')
        .setDescription('The input to echo back')
        .setRequired(true)),
    async execute(interaction) {
        try {
            await interaction.reply(interaction.options.getString('input'))
        } catch (e) {
            console.error(e)
        }
    },
}
*/