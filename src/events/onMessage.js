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
        console.log(message);
        try {
            const channel = message.channelId;
            const lqannouncements = "900086774141956216"
            // The incoming webhook id
            const hookId = message.webhookId;
            // If the message was created in the LQ-Announcements channel and it is a Webhook message
            if (channel === lqannouncements && hookId){
                if (message.content === "LRD"){
                    console.log("Sending message to Application, shouldn't see discord message");
                    message.content = "";
                } else {
                    console.log("Hooked message, forward to other server")
                    const webhook = new WebhookClient({id: webhookId, token: webhookToken});
                    const originalEmbed = message.embeds[0];
                    const originalFields = originalEmbed.fields;
                    console.log(originalFields)
                    console.log(originalEmbed)
                    const newEmbeds = new MessageEmbed()
                        .setTitle(originalEmbed.title)
                        .setDescription(originalEmbed.description)
                        .setColor("#0099ff")
                        .setImage("https://i.pinimg.com/550x/65/e3/4b/65e34b409feb6d86376b9de87e4c08c3.jpg")
                        .setFields(originalFields)
                    const newMessage = {
                        username: "Wyvern Automated Live Quest Messaging System",
                        avatarURL: "https://i.imgur.com/lna0M5y.png",
                        embeds: [newEmbeds]
                    }
                    webhook.send(newMessage).catch(console.error);
                }
            }
        } catch (e) {
            console.error(e)
        }
	},
};