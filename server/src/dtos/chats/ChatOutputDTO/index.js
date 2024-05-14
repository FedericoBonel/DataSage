import ChatOutputDTO from "./ChatOutputDTO.js";
import ChatOwnerDTO from "./OwnerOutputDTO.js";

/**
 * Transforms a chat owner as it is stored in the database to how it should be exposed inside a chat.
 * @param {*} owner The owner as it is stored in the database
 */
const toChatOwnerDTO = (owner) => {
    const dto = new ChatOwnerDTO();
    dto._id = owner._id;
    dto.names = owner.names;
    dto.lastnames = owner.lastnames;
    return dto;
};

/**
 * Transforms a chat as it is stored in the database to how it should be exposed.
 * @param {*} chat The chat as it is stored in the database
 * @param {string} userId The id of the user that is requesting the chat
 */
const toChatOutputDTO = (chat, userId) => {
    const dto = new ChatOutputDTO();
    dto._id = chat._id;
    dto.name = chat.name;
    dto.isOwner = chat.owner._id.toString() === userId;
    dto.createdAt = chat.createdAt.toISOString();
    dto.owner = toChatOwnerDTO(chat.owner);
    // If this function is being used, it must be the chat owner since it has access to the chat it self and not a collaborator
    dto.hasJoined = chat.owner._id.toString() === userId;
    dto.permissions = chat.owner._id.toString() === userId ? [] : undefined;
    return dto;
};

export { toChatOwnerDTO, toChatOutputDTO };
