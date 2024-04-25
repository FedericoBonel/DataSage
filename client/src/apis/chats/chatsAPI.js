import { api } from "@/utils/constants";
import { makeRequest } from "@/lib/axios";

/**
 * Gets a list of chats from the back end for the logged in user
 * @param {object} filtering Filtering parameters
 * @param {string} filtering.ownership If the chats should be owned by the user or shared to them
 * @param {string} filtering.textSearch String to search the list of chats by
 * @param {object} pagination Pagination parameters
 * @param {number} pagination.page Page number to get results from
 * @param {number} pagination.limit Number of results per page
 * @returns The server response payload with the list of chats
 */
const getChats = async (filtering, pagination) => {
    const params = {
        ownership: filtering.ownership,
        textSearch:
            filtering.textSearch === "" ? undefined : filtering.textSearch,
        page: pagination.page,
        limit: pagination.limit,
    };

    return await makeRequest({
        url: api.urls.chats.GET_ALL,
        method: "get",
        params,
    });
};

/**
 * Registers a new chat in the back end and returns the saved version.
 * @param {object} newChat The new chat to be saved
 * @param {string} newChat.name Name of the chat
 * @param {Array.<File>} newChat.documents Documents to be used as the chat knowledge base
 * @returns The promise that resolves to the new created chat
 */
const createChat = async (newChat) => {
    return makeRequest({
        url: api.urls.chats.CREATE,
        method: "post",
        data: newChat,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

/**
 * Deletes a chat and all its data by id from the system.
 * @param {string} chatId Id of the chat to delete
 * @returns The server response payload with the deleted chat
 */
const deleteChatById = async (chatId) => {
    return makeRequest({
        url: api.urls.chats.createDelete(chatId),
        method: "delete",
    });
};

/**
 * Gets a chat by id
 * @param {string} chatId The id of the chat
 * @returns The server response payload with the chat with that id
 */
const getChatById = async (chatId) => {
    return await makeRequest({
        url: api.urls.chats.createGetById(chatId),
        method: "get",
    });
};

/**
 * Updates a chat by id.
 * @param {object} updatedChat The updated chat to be saved
 * @param {string} updatedChat.name Name of the chat
 * @param {string} chatId Id of the chat to update
 * @returns The promise that resolves to the updated chat
 */
const updateChatById = async (updatedChat, chatId) => {
    return makeRequest({
        url: api.urls.chats.createPut(chatId),
        method: "put",
        data: updatedChat,
    });
};

/**
 * Gets a chat documents by chat id
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

/**
 * Gets a list of chat messages from a chat by id from the back end
 * @param {object} pagination Pagination parameters
 * @param {number} pagination.page Page number to get results from
 * @param {number} pagination.limit Number of results per page
 * @returns The server response payload with the list of chat messages (chat history)
 */
const getMessagesByChat = async (chatId, pagination) => {
    const params = {
        page: pagination.page,
        limit: pagination.limit,
    };

    return await makeRequest({
        url: api.urls.chats.createGetAllMsgs(chatId),
        method: "get",
        params,
    });
};

/**
 * Sends a message to a chat by id.
 * @param {object} message The object wrapping the new message to be sent.
 * @param {string} message.content Content of the message being sent
 * @param {string} chatId Id of the chat to which to send the message
 * @returns The promise that resolves to the AI response to the sent message.
 */
const sendMessageToChat = async (message, chatId) => {
    return makeRequest({
        url: api.urls.chats.createCreateMsgs(chatId),
        method: "post",
        data: message,
    });
};


export default {
    getChats,
    createChat,
    deleteChatById,
    getChatById,
    updateChatById,
    getDocsByChat,
    addDocsToChat,
    deleteDocFromChat,
    getMessagesByChat,
    sendMessageToChat,
};
