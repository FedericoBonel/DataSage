import { api } from "@/utils/constants";
import { makeRequest } from "@/lib/axios";

/**
 * Gets a chats documents by chat id
 * @param {string} chatId The id of the chat from which to get the documents
 * @returns The server response payload with the chat documents
 */
const getDocsByChat = async (chatId) => {
    return makeRequest({
        url: api.urls.chats.createGetAllDocs(chatId),
        method: "get",
    });
};

/**
 * Adds a list of documents to a chat by id
 * @param {string} chatId Id of the chat to add the documents to
 * @param {object} newDocs Documents object container, should contain an attribute "documents" with the document files to upload
 * @param {Array.<File>} newDocs.documents Documents to be uploaded to the chat
 * @returns The server response payload with the newly added chat documents
 */
const addDocsToChat = async (newDocs, chatId) => {
    return makeRequest({
        url: api.urls.chats.createCreateDocs(chatId),
        method: "post",
        data: newDocs,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

/**
 * Deletes a document from a chat by id
 * @param {string} documentId Id of the document to remove from the chat
 * @param {string} chatId Id of the chat to remove the documents from
 * @returns The server response payload with the deleted document
 */
const deleteDocFromChat = async (documentId, chatId) => {
    return makeRequest({
        url: api.urls.chats.createDeleteDoc(chatId, documentId),
        method: "delete",
    });
};

export default {
    getDocsByChat,
    addDocsToChat,
    deleteDocFromChat,
};
