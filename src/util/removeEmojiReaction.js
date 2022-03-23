// Helper function to remove illegal emoji reactions
// from protected messages.

const client = require('../client');

const removeEmojiReaction = async (reaction, user) => {
    const emoji = reaction.emoji.name
    // test server
    // const message = await client.channels.cache.get('955900224394645576').messages.fetch("955901312778768424")
    const message = await client.channels.cache.get('956109822636457994').messages.fetch("956111869804949534")
    await message.reactions.cache.find(reaction => reaction.emoji.name == emoji).users.remove(user.id)
    return
}

module.exports = removeEmojiReaction;