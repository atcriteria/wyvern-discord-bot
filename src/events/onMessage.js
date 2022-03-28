const { MessageEmbed, WebhookClient } = require('discord.js')
const webhookId = process.env.TOE_WEBHOOK_ID
const webhookToken = process.env.TOE_WEBHOOK_TOKEN


// Currently hardwired to forward the Wyvern Game's DiscordWebhook message to
// Toe's Discord channel. For future use with the 'messageCreate' event you
// should pull the code that handles this functionality to its own module
// and import it back to clean this up.
module.exports = {
	name: 'messageCreate',
	async execute(message){
        try {
            const channel = message.channelId;
            const lqannouncements = "900086774141956216"
            // The incoming webhook id
            const hookId = message.webhookId;
            // If the message was created in the LQ-Announcements channel and it is a Webhook message
            if (channel === lqannouncements && hookId){
                console.log("Hooked message, forward to other server")
                const webhook = new WebhookClient({id: webhookId, token: webhookToken});
                // This has the server time in it
                const originFields = message.embeds.fields
                console.log(originFields)
                const newEmbeds = new MessageEmbed()
                    .setTitle("Automated Live Quest Starting")
                    .setDescription("Work together with other players to overcome unique challenges or defeat powerful foes.")
                    .setColor("#0099ff")
                    .setImage("https://i.pinimg.com/550x/65/e3/4b/65e34b409feb6d86376b9de87e4c08c3.jpg")
                    // .setFields(originFields)
                const newMessage = {
                    username: "Wyvern Automated Live Quest Messaging System",
                    avatarURL: "https://i.imgur.com/lna0M5y.png",
                    embeds: [newEmbeds]
                }
                webhook.send(newMessage).catch(console.error);
            }
        } catch (e) {
            console.error(e)
        }
	},
};