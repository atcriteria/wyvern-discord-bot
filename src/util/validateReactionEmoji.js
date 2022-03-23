// A helper function that validates a user has reaction
// to an approved message with an approved emoji.
// If they have reacted with an illegal emoji, we do not
// assign a role and remove the reaction. Helpful for 
// reducing clutter.

// Returns True if we are valid
// Returns False if not

const roles = require('./roles');

const validateReactionEmoji = (reaction) => {
    const emojiUnicode = reaction.emoji.name.codePointAt(0).toString(16);
    const isApprovedEmoji = roles[emojiUnicode]
    if (isApprovedEmoji){
        return true
    } else {
        return false
    }
}

module.exports = validateReactionEmoji;