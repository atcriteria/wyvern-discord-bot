const { SlashCommandBuilder } = require('@discordjs/builders');

// Takes an emoji and returns the unicode value of it
module.exports = {
    data: new SlashCommandBuilder()
        .setName('emojicode')
        .setDescription('Takes an Emoji and responds with the Unicode version of it')
        .addStringOption(option => option.setName('input')
            .setDescription('The emoji to translate.')
            .setRequired(true)),
    async execute(interaction) {
        try {
            const emojiUnicode = interaction.options.getString('input').codePointAt(0).toString(16);
            await interaction.reply(`${interaction.options.getString('input')} === ${emojiUnicode}`)
        } catch (e) {
            console.error(e)
        }
    },
};