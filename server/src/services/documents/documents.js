import chatsRepository from "../../repositories/chats/chats.js";
import documentDTO from "../../dtos/documents/index.js";
import { NotFoundError } from "../../utils/errors/index.js";
import { messages } from "../../utils/constants/index.js";

/**
 * Gets ALL the documents for a chat by id with all their details.
 *
 * @param {string} chatId Id of the chat from which to get the documents.
 * @returns The saved documents for that chat.
 */
const getByChatId = async (chatId) => {
    // Get the chat with all its documents
    const foundChat = await chatsRepository.getById(chatId);
    if (!foundChat) {
        throw new NotFoundError(messages.errors.ROUTE_NOT_FOUND);
    }

    // Generate urls for each document
    const signedUrls = await chatsRepository.docsToUrls(foundChat.documents);

    // Transform and return the documents only hiding their storeId
    return foundChat.documents.map((doc, index) => documentDTO.toDocumentOutputDTO(doc, signedUrls[index]));
};

export default { getByChatId };
