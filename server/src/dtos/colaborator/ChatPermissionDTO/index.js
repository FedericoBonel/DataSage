import ChatPermissionDTO from "./ChatPermissionDTO.js";

/**
 * Transforms a colaborator permission as it is stored in the database to how it should be exposed inside a chat.
 * @param {*} permission The permission as it is stored in the database
 */
const toChatPermissionDTO = (permission) => {
    const dto = new ChatPermissionDTO();
    dto._id = permission._id;
    dto.allowedAction = permission.allowedAction;
    return dto;
};

export { toChatPermissionDTO };
