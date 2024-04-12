import { toChatOutputDTO, toChatOwnerDTO } from "./ChatOutputDTO/index.js";

/** Name of the key where documents should be stored by clients when sending to server */
const DOCS_INPUT_KEY = "documents";

/**
 * Transforms a chat as it is exposed in the api for chat creation to how it should be stored in the database.
 * @param {*} chatInputDTO The chat as it is exposed for creation
 * @param {*} documents The documents as they are sent by the user and parsed by the corresponding middleware
 * @param {*} user The user as it is saved in the database that creates the chat
 */
const toChatModel = (chatInputDTO, documents, user) => ({
    name: chatInputDTO.name,
    documents,
    owner: user,
});

export default { toChatOwnerDTO, toChatOutputDTO, toChatModel, DOCS_INPUT_KEY };
