import chatsRepository from "../../repositories/chats/chats.js";
import usersRepository from "../../repositories/users/users.js";
import pagesRepository from "../../repositories/pages/pages.js";
import colaboratorRepository from "../../repositories/colaborators/colaborators.js";
import chatDTO from "../../dtos/chats/index.js";
import colaboratorDTO from "../../dtos/colaborator/index.js";
import { parseDocumentsInPages } from "./utils/index.js";
import { BadRequestError, UnauthorizedError } from "../../utils/errors/index.js";
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

    // Save the chat and its documents
    const savedChat = await chatsRepository.save(chatDTO.toChatModel(chat, documents, user));

    // Save the colaborator instance for this chat owner
    await colaboratorRepository.save(colaboratorDTO.newChatToColaboratorModel(user, savedChat));

    // Extract all pages from the documents, add metadata and save them
    const pages = await parseDocumentsInPages(documents, savedChat.documents, {
        maxPages: validation.document.pages.MAX_PAGES,
    });
    await pagesRepository.saveAll(pages);

    return chatDTO.toChatOutputDTO(savedChat);
};

/**
 * Retrieves a list of chats based on provided parameters.
 * @param {string} userId The user that Id that is logged in.
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

export default { create, get };
