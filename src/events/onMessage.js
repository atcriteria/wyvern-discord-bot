const { MessageEmbed } = require('discord.js')
const { getLQData } = require("../util/data")
// Reddit wrapper
const snoowrap = require('snoowrap');

// Initialize Reddit client only when needed and with proper error handling
let reddit = null;

const initializeReddit = () => {
    if (reddit) return reddit;
    
    try {
        // Check if all required environment variables are present
        const requiredVars = ['REDDIT_USER_AGENT', 'REDDIT_CLIENT_ID', 'REDDIT_CLIENT_SECRET', 'REDDIT_USERNAME', 'REDDIT_PASSWORD'];
        const missingVars = requiredVars.filter(varName => !process.env[varName]);
        
        if (missingVars.length > 0) {
            console.warn(`Reddit integration disabled: Missing environment variables: ${missingVars.join(', ')}`);
            return null;
        }
        
        reddit = new snoowrap({
            userAgent: process.env.REDDIT_USER_AGENT,
            clientId: process.env.REDDIT_CLIENT_ID,
            clientSecret: process.env.REDDIT_CLIENT_SECRET,
            username: process.env.REDDIT_USERNAME,
            password: process.env.REDDIT_PASSWORD,
        });
        
        console.log('Reddit client initialized successfully');
        return reddit;
    } catch (error) {
        console.error('Failed to initialize Reddit client:', error);
        return null;
    }
};

// No longer supporting the forwarding to other servers
// In the future, the Wyvern Server may become a community server
// and then anyone can subscribe to our LQ announcements channel
module.exports = {
	name: 'messageCreate',
	async execute(message){
        try {
            const channel = message.channelId;
            const lqannouncements = "900086774141956216"
            const newsChannel = "718986723253682317"
            const newsRole = "1218947003552104598"
            // The incoming webhook id
            const hookId = message.webhookId;

            // Handle the flow of pasting news messages to Reddit
            if (channel === newsChannel){
                if (message.mentions.roles && !message.mentions.roles.has(newsRole)) return;
                let author = message.author.username;
                // Only let me and Rizato post to Reddit from Discord.
                if (author.toLowerCase() != "archanine" && author.toLowerCase() != "rizato") return;
                if (message.guild){
                    author = message.member.nickname;
                }
                let date = new Date();
                let month = String(date.getMonth() + 1).padStart(2, '0')
                let day = String(date.getDate()).padStart(2, '0')
                let year = date.getFullYear()
                const content = message.content;
                // Regular expression to match Discord role mentions
                const roleMentionRegex = /<@&\d+>\s*/g;
                // Replace the role mention with an empty string
                const trimmedContent = content.replace(roleMentionRegex, '');

                const redditClient = initializeReddit();
                if (redditClient) {
                    redditClient.getSubreddit("wyvernrpg").submitSelfpost({
                        title: `Wyvern Patch Notes (${author}): ${month}/${day}/${year}`,
                        text: trimmedContent
                    }).then(submission => console.log('Posted to Reddit', submission.url)).catch(console.error)
                } else {
                    console.log('Reddit posting skipped: Reddit client not available');
                }
            }
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
                    await message.delete();
                    message.channel.send(newMessage)
                }
            }
        } catch (e) {
            console.error(e)
        }
	},
};