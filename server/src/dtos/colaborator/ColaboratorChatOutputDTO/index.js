import ChatDetailsOutputDTO from "./ChatDetailsOutputDTO.js";
import { toChatOwnerDTO } from "../../chats/ChatOutputDTO/index.js";
import { toChatPermissionDTO } from "../ChatPermissionDTO/index.js";

/**
 * Transforms a colaborator as it is stored in the database to how it should be exposed in a detailed manner as a chat.
 * @param {*} colaborator The colaborator as it is stored in the database
 * @param {string} userId The id of the user requesting the details of the chat
 * @returns The colaborator chat
 */
const colaboratorToChatDetailsOutputDTO = (colaborator, userId) => {
    const dto = new ChatDetailsOutputDTO();
    dto._id = colaborator.chat._id;
    dto.name = colaborator.chat.name;
    dto.owner = toChatOwnerDTO(colaborator.chat.owner);
    dto.isOwner = userId === colaborator.chat.owner._id.toString();
    dto.hasJoined = colaborator.hasJoined;
    dto.permissions = colaborator.permissions.map((permission) => toChatPermissionDTO(permission));
    dto.createdAt = colaborator.chat.createdAt?.toISOString();
    return dto;
};

export { colaboratorToChatDetailsOutputDTO };
