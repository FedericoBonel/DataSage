import ColaboratorOutputDTO from "./ColaboratorOutputDTO/ColaboratorOutputDTO.js";
import chatsDTO from "../chats/index.js";

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

/**
 * Transforms a colaborator as it is stored in the database to how it should be exposed.
 * @param {*} colaborator The colaborator as it is stored in the database
 */
const toColaboratorOutputDTO = (colaborator) => {
    const dto = new ColaboratorOutputDTO();
    dto._id = colaborator.chat._id;
    dto.name = colaborator.chat.name;
    dto.createdAt = colaborator.chat.createdAt;
    dto.owner = chatsDTO.toChatOwnerDTO(colaborator.chat.owner);
    return dto;
};

export default { newChatToColaboratorModel, toColaboratorOutputDTO };
