import chatsRepository from "../../repositories/chats/chats.js";
import pagesRepository from "../../repositories/pages/pages.js";
import documentDTO from "../../dtos/documents/index.js";
import { BadRequestError, NotFoundError } from "../../utils/errors/index.js";
import { messages, validation } from "../../utils/constants/index.js";
import { parseDocumentsInPages, flatPagesByDocuments } from "./utils/index.js";

/**
 * Gets ALL the documents for a chat by id with all their details.
 *
 * NOTE: Validation of permissions should be done before this.
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

/**
 * Deletes a document from a chat by the chats id, the logged in user, and the documents id.
 * @param {string} chatId Id of the chat from which to remove the document.
 * @param {string} documentId Id of the document to remove.
 * @param {string} userId Id of the logged in user.
 * @returns The deleted document as it should be exposed to the web.
 */
const deleteById = async (chatId, documentId, userId) => {
    // If the chat has 1 document the deletion should not be ran, it needs at least 1 document.
    // If nothing is found then the chat for that user does not exist
    const numberOfDocuments = await chatsRepository.countDocumentsByIdAndOwner(chatId, userId);
    if (numberOfDocuments === undefined) {
        throw new NotFoundError(messages.errors.ROUTE_NOT_FOUND);
    } else if (numberOfDocuments <= 1) {
        throw new BadRequestError(messages.errors.validation.chat.documents.MINIMUM_REACHED);
    }

    // Delete the document from the chat and get it
    const deletedDocument = await chatsRepository.removeDocumentByIdAndOwner(chatId, documentId, userId);
    if (!deletedDocument) {
        throw new NotFoundError(messages.errors.ROUTE_NOT_FOUND);
    }

    // Transform and return the document by itself
    return documentDTO.toDocumentOutputDTO(deletedDocument);
};

/**
 *
 */
const addToChatById = async (documents, chatId) => {
    // Check if the chat has reached its limit of uploaded documents after uploading documents
    const savedNumberDocs = await chatsRepository.countDocumentsById(chatId);
    if (savedNumberDocs === undefined) {
        throw new NotFoundError(messages.errors.ROUTE_NOT_FOUND);
    } else if (savedNumberDocs + documents.length > validation.chat.documents.MAX_AMOUNT) {
        throw new BadRequestError(messages.errors.validation.chat.documents.MAXIMUM_REACHED);
    }

    // Parse the documents into pages and check that they dont have more than the allowed amount of pages
    const parsedPagesPerDocument = await parseDocumentsInPages(documents, {
        maxPages: validation.document.pages.MAX_PAGES,
    });

    // Add the documents to the chat and save them
    const savedChat = await chatsRepository.addDocsById(documents, chatId);

    // Append the ids of the documents to the pages of each document and save them
    await pagesRepository.saveAll(flatPagesByDocuments(parsedPagesPerDocument, savedChat.documents));

    const newDocs = savedChat.documents
        .sort((docA, docB) => docB.createdAt.getTime() - docA.createdAt.getTime())
        .slice(0, documents.length);

    // Generate urls for each document
    const signedUrls = await chatsRepository.docsToUrls(newDocs);

    return newDocs.map((doc, index) => documentDTO.toDocumentOutputDTO(doc, signedUrls[index]));
};

export default { getByChatId, deleteById, addToChatById };
