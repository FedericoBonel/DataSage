import chatsRepository from "../../repositories/chats/chats.js";
import usersRepository from "../../repositories/users/users.js";
import pagesRepository from "../../repositories/pages/pages.js";
import colaboratorRepository from "../../repositories/colaborators/colaborators.js";
import chatDTO from "../../dtos/chats/index.js";
import colaboratorDTO from "../../dtos/colaborator/index.js";
import { parseDocumentsInPages, flatPagesByDocuments } from "./utils/index.js";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../../utils/errors/index.js";
import { validation, messages } from "../../utils/constants/index.js";
import calculateSkip from "../../utils/db/calculateSkip.js";

/**
 * A document that represents a file to be saved as the chat knowledge base.
 * @typedef {Object} document
 * @property {string} originalname
 * @property {Buffer} buffer
 * @property {string} mimetype
 * @property {number} size
 */

/**
 * Creates a new chat in the system.
 * @param {{ name: string }} chat new chat to be created
 * @param {Array.<document>} documents array of documents containing the chat knowledge base
 * @param {string} userId Id of the user that is creating the chat
 * @returns The saved chat as DTO
 */
const create = async (chat, documents, userId) => {
    // Verify that the name for the chat is unique for this user
    const foundChats = await chatsRepository.getByNameAndOwner(chat.name, userId);
    if (foundChats) {
        throw new BadRequestError(messages.errors.validation.chat.name.INVALID_LENGTH);
    }

    // Verify that the user exists and get their information
    const user = await usersRepository.getById(userId);
    if (!user) {
        throw new UnauthorizedError(messages.errors.auth.INVALID_CREDENTIALS);
    }

    // Parse the documents into pages and check that they dont have more than the allowed amount of pages
    const parsedPagesPerDocument = await parseDocumentsInPages(documents, {
        maxPages: validation.document.pages.MAX_PAGES,
    });

    // Save the chat and its documents
    const savedChat = await chatsRepository.save(chatDTO.toChatModel(chat, documents, user));

    // Save the colaborator instance for this chat owner
    await colaboratorRepository.save(colaboratorDTO.newChatToColaboratorModel(user, savedChat));

    // Append the ids of the documents to the pages of each document and save them
    await pagesRepository.saveAll(flatPagesByDocuments(parsedPagesPerDocument, savedChat.documents));

    return chatDTO.toChatOutputDTO(savedChat);
};

/**
 * Retrieves a list of chats based on provided parameters.
 * @param {string} userId The Id of the user that is logged in.
 * @param {Object} [filtering={}] Filtering options. This will filter out values in the result.
 * @param {string} [filtering.textSearch=undefined] Text search query. Filters values to only those that match this text search.
 * @param {string} [filtering.ownership=undefined] Ownership filter. Can be either "self" or "shared" filters out results to those owned by the user or shared to them.
 * @param {Object} [pagination={}] Pagination options.
 * @param {number} [pagination.page=undefined] Page number.
 * @param {number} [pagination.limit=undefined] Limit per page.
 * @returns The list of chats that match the parameters.
 */
const get = async (
    userId,
    filtering = { textSearch: undefined, ownership: undefined },
    pagination = { page: 1, limit: 10 }
) => {
    // Check if the list needs to be filtered by ownership
    let chatOwnerId;
    if (filtering.ownership === validation.chat.filtering.OWNERSHIP_ALLOWED[0]) {
        chatOwnerId = userId;
    } else if (filtering.ownership === validation.chat.filtering.OWNERSHIP_ALLOWED[1]) {
        chatOwnerId = validation.chat.filtering.OWNERSHIP_ALLOWED[1];
    }

    const skip = calculateSkip(pagination.page, pagination.limit);

    const savedChatsForUser = await colaboratorRepository.getAllBy(
        { textSearch: filtering.textSearch, chatOwnerId, userId },
        { skip, limit: pagination.limit, sort: "-createdAt" }
    );

    return savedChatsForUser.map((colaborator) => colaboratorDTO.toColaboratorOutputDTO(colaborator));
};

/**
 * Updates a chat by id.
 * @param {{name: String}} updatedChat The updated chat
 * @param {string} chatId The id of the chat to update.
 * @param {string} userId The user Id of the user that is logged in.
 * @returns The updated chat.
 */
const updateById = async (updatedChat, chatId, userId) => {
    // Check that no chat with the same name exists for the user
    const sameNameChat = await chatsRepository.getByNameAndOwner(updatedChat.name, userId);
    if (sameNameChat && sameNameChat._id.toString() !== chatId) {
        throw new BadRequestError(messages.errors.validation.chat.name.INVALID_LENGTH);
    }

    // Update the chat by id
    const savedChat = await chatsRepository.updateByIdAndOwner(chatDTO.updateToChatModel(updatedChat), chatId, userId);
    if (!savedChat) {
        throw new NotFoundError(messages.errors.ROUTE_NOT_FOUND);
    }

    return chatDTO.toChatOutputDTO(savedChat);
};

/**
 * Gets a chat by id with all the details.
 * @param {string} chatId Id of the chat to retrieve.
 * @param {string} userId Id of the logged in user.
 * @returns The saved chat with that id.
 */
const getById = async (chatId, userId) => {
    // Get the colaborator instance for the user and check that it exists.
    const savedChatForUser = await colaboratorRepository.getByChatAndUser(chatId, userId);
    if (!savedChatForUser) {
        throw new NotFoundError(messages.errors.ROUTE_NOT_FOUND);
    }

    // Transform and return the colaborator as chat
    return colaboratorDTO.colaboratorToChatDetailsOutputDTO(savedChatForUser, userId);
};

export default { create, get, updateById, getById };
