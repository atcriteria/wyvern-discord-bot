const roles = require('./roles');


/*
    param1 reaction: reaction object
    param2 user: user object
    param3 direction: boolean, True = add role, False = remove role
*/
const applyRemoveRole = (reaction, user, direction) => {
    const emojiUnicode = reaction.emoji.name.codePointAt(0).toString(16);
    const targetRole = roles[emojiUnicode];
    const role = reaction.message.guild.roles.cache.get(targetRole);
    const member = reaction.message.guild.members.cache.find(member => member.id == user.id);
    try {
        if (role && member) {
            if (direction) {
                addRemoveRole(member, targetRole, direction)
            } else if (!direction) {
                addRemoveRole(member, targetRole, direction)
            }
        }
    } catch (e) {
        console.error(e);
        return
    }
}

const addRemoveRole = (member, role, addRemove) => {
    (addRemove) ? member.roles.add(role).catch(console.error) : member.roles.remove(role).catch(console.error);
}


module.exports = applyRemoveRole;