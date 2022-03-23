const trackedRoleMessages = require('../util/trackedRoleMessages');
const applyRemoveRole = require('../util/applyRemoveRole');

module.exports = {
	name: 'messageReactionRemove',
	execute(reaction, user){
        const messageID = reaction.message.id;
        if (trackedRoleMessages[messageID]){
            applyRemoveRole(reaction, user, false);
        }
	},
};