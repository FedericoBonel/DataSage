import { chat } from "../../models/chat/chat.js";
import { saveFilesInS3 } from "../../lib/amazonS3.js";

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

export default { save, getByNameAndOwner };
