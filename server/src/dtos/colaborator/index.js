/**
 * Formats the data of a new chat to how it should be stored in database
 * @param {*} user The user as it is saved in the database that creates the chat
 * @param {*} chat The new chat that has been created as it is saved in the database
 */
const newChatToColaboratorModel = (user, chat) => ({
    user,
    chat,
    hasJoined: true,
});

export default { newChatToColaboratorModel };
