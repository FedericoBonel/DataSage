import { Types } from "mongoose";
import { chat } from "../../models/chat/chat.js";
import { page } from "../../models/page/page.js";
import { message } from "../../models/message/message.js";
import { colaborator } from "../../models/colaborator/colaborator.js";
import { saveFilesInS3, getSignedURLById, deleteFileInS3 } from "../../lib/amazonS3.js";

/**
 * Gets a chat by its name and its owner id and returns it
 * @param {String} name Name of the to find
 * @param {String} ownerId Id of the owner of the chat
 * @returns The found chat or undefined if nothing was found
 */
const getByNameAndOwner = async (name, ownerId) => chat.findOne({ name, "owner._id": ownerId }).lean();

/**
 * Stores all documents in the cloud store and formats them to how they should be stored and returns them.
 * @param {Array.<{originalname: string, size: number}>} documents Array of documents to be stored
 * @returns An array with all the documents and their ids in the cloud store.
 */
const storeAllDocs = (documents) =>
    Promise.all(
        documents.map((document) =>
            saveFilesInS3(document).then((storeId) => {
                const formattedDoc = {
                    storeId,
                    name: document.originalname,
                    size: document.size,
                };
                return formattedDoc;
            })
        )
    );

/**
 * Deletes a document from the store by its store id
 * @param {string} storeId store id
 */
const deleteDocFromStore = (storeId) => deleteFileInS3(storeId);

/**
 * Transforms all document's store ids to signed urls
 * @param {{storeId: string}} documents Documents as they are stored in database
 * @returns {Promise.<string>} An array with all the urls for those documents in order
 */
const docsToUrls = (documents) => Promise.all(documents.map((doc) => getSignedURLById(doc.storeId)));

/**
 * Saves a new chat in the database and all its documents in the cloud store.
 * @param {*} newChat The chat to be saved
 * @returns The saved chat
 */
const save = async (newChat) => {
    // Extract documents from chat object that needs to be saved
    const { documents, ...formattedChat } = newChat;

    // Save all documents into the store and add them to the chat to be saved
    const savedDocs = await storeAllDocs(newChat.documents);
    formattedChat.documents = savedDocs;

    // Create chat and documents in database
    return chat.create(formattedChat);
};

/**
 * Updates a chat in the database by id and owner id
 * @param {*} updates The updates to be made on the chat
 * @param {string} chatId The chat id to update
 * @param {string} ownerId The chat owners id
 * @returns The updated chat
 */
const updateByIdAndOwner = async (updates, chatId, ownerId) => {
    if (!chatId || !ownerId) throw Error("Missing parameters");
    const oldChat = await chat.findOneAndUpdate({ _id: chatId, "owner._id": ownerId }, updates).lean();

    // If nothing was found return it as undefined;
    if (!oldChat) {
        return oldChat;
    }

    // Simulate the new data returned by database
    const updatedChat = { ...oldChat, ...updates, updatedAt: Date.now() };

    // Keep redundancies up to date
    if (updates.name && oldChat.name !== updates.name) {
        await colaborator.updateMany({ "chat._id": chatId, "chat.owner._id": ownerId }, { chat: updatedChat });
    }

    return updatedChat;
};

/**
 * Gets a chat by id
 * @param {string} id Id of the chat to get
 * @returns The found chat or undefined otherwise
 */
const getById = async (id) => chat.findById(id).lean();

/**
 * Removes a document by id and chat owner id from a chat
 * @param {string} chatId Id of the chat from which to remove the document
 * @param {string} documentId Id of the document to remove
 * @param {string} ownerId Id of the owner of the chat from which to remove the document
 * @returns The deleted document or undefined if no document was found
 */
const removeDocumentByIdAndOwner = async (chatId, documentId, ownerId) => {
    if (!documentId || !chatId || !ownerId) throw Error("Missing parameters");
    // Update the chat and get its state before update
    const chatBeforeUpdate = await chat
        .findOneAndUpdate({ _id: chatId, "owner._id": ownerId }, { $pull: { documents: { _id: documentId } } })
        .lean();
    // Check if the document exists
    const deletedDocument = chatBeforeUpdate?.documents.find((doc) => doc._id.toString() === documentId);

    // If chat does not exist or document does not exist return undefined, otherwise clear up redundancies
    if (!chatBeforeUpdate || !deletedDocument) {
        return undefined;
    }

    // Delete the pages of the document
    await page.deleteMany({ document: documentId });

    // Delete the source of the messages where this document is used
    await message.updateMany({}, { $pull: { sources: { document: documentId } } });

    // Delete the file from the cloud
    await deleteDocFromStore(deletedDocument.storeId);

    return deletedDocument;
};

/**
 * Obtains the number of documents for a chat by chat id and owner id
 *
 * NOTE: This function could return a number 0 or undefined, the value undefined means nothing
 * was found with those ids, the number 0 means a 0 count. Proper checking should be done.
 * @param {string} chatId Id of the chat where the documents should be counted
 * @param {string} ownerId Id of the owner of the chat where the documents should be counted.
 * @returns Number of documents for that chat with that owner, if nothing was found it returns undefined.
 */
const countDocumentsByIdAndOwner = async (chatId, ownerId) => {
    if (!chatId || !ownerId) throw new Error("Missing parameters");

    const numberOfDocuments = await chat
        .aggregate()
        .match({ _id: new Types.ObjectId(chatId), "owner._id": new Types.ObjectId(ownerId) })
        .project({ _id: 0, documentCount: { $size: "$documents" } });

    return numberOfDocuments.length ? numberOfDocuments[0].documentCount : undefined;
};

export default {
    save,
    getByNameAndOwner,
    updateByIdAndOwner,
    getById,
    docsToUrls,
    removeDocumentByIdAndOwner,
    countDocumentsByIdAndOwner,
};
