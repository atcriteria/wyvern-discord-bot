const trackedRoleMessages = require('../util/trackedRoleMessages');
const applyRemoveRole = require('../util/applyRemoveRole');
const validateReactionEmoji = require('../util/validateReactionEmoji');
const removeEmojiReaction = require('../util/removeEmojiReaction');

module.exports = {
	name: 'messageReactionAdd',
	execute(reaction, user){
        try {
            const messageID = reaction.message.id;
            if (trackedRoleMessages[messageID]){
                const isValidReaction = validateReactionEmoji(reaction);
                if (isValidReaction){
                    applyRemoveRole(reaction, user, true);
                } else {
                    removeEmojiReaction(reaction, user)
                }
            }
        } catch (e) {
            console.error(e)
        }
	},
};