const { MessageEmbed } = require('discord.js')
const { getLQData } = require("../util/data")


// No longer supporting the forwarding to other servers
// In the future, the Wyvern Server may become a community server
// and then anyone can subscribe to our LQ announcements channel
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
                console.log(message);
                if (message.content === "LRD"){
                    console.log("Sending message to Application, shouldn't see discord message");
                    await message.delete();
                } else {
                    // Create a new message, nuke the original, and send the new message to the channel
                    const originalEmbed = message.embeds[0];
                    const originalFields = originalEmbed.fields;
                    const data = getLQData(originalEmbed.description)
                    const newEmbeds = new MessageEmbed()
                        .setTitle(data.data["title"])
                        .setDescription(originalEmbed.description)
                        .setColor(data.data["color"])
                        .setImage(data.data["image"])
                        .setFields(originalFields)
                    const newMessage = {
                        username: "Wyvern Automated Live Quest Messaging System",
                        avatarURL: "https://i.imgur.com/lna0M5y.png",
                        embeds: [newEmbeds]
                    }
                    // @LQ ping -- only when announcing an LQ, not on conclusion
                    newMessage.content = data.ping ? "<@&690215508393590784>" : "."
                    // await message.delete();
                    message.channel.send(newMessage)
                }
            }
        } catch (e) {
            console.error(e)
        }
	},
};