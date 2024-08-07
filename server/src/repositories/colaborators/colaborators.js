import { colaborator } from "../../models/colaborator/colaborator.js";
import { message } from "../../models/message/message.js";
import { notification } from "../../models/notification/notification.js";
import { notifications } from "../../utils/constants/index.js";

/**
 * Saves a new colaborator in the database for a chat and a user.
 * @param {*} newColaborator The colaborator to be saved
 * @returns The saved colaborator
 */
const save = async (newColaborator) => colaborator.create(newColaborator);

/**
 * Retrieves all colaborator instances based on provided parameters.
 * @param {Object} [filtering] Filtering options.
 * @param {string} [filtering.textSearch] Text search query.
 * @param {boolean} [filtering.hasJoined] If the list should include only collaborators where the user has joined or not.
 * @param {(string|null|undefined)} [filtering.chatOwnerId] Chat owner ID filter. Can be a valid ID, null, undefined, or 'shared'. If shared and userId provided, values are filtered for that user where ownerId is not equal to them.
 * @param {string} [filtering.userId] Id of the user colaborator for additional filtering.
 * @param {Object} [resultsProcessing] Results processing options.
 * @param {number} [resultsProcessing.skip] Number of items to skip from the beggining of the results.
 * @param {number} [resultsProcessing.limit] Limit of items to retrieve.
 * @param {string} [resultsProcessing.sort] Sorting criteria.
 * @returns All matching colaborator instances
 */
const getAllBy = async (
    filtering = { textSearch: undefined, chatOwnerId: undefined, userId: undefined, hasJoined: undefined },
    resultsProcessing = { skip: 0, limit: undefined, sort: undefined }
) => {
    const filterQuery = {};
    // If there is a filtering being done by chat owner
    if (filtering.chatOwnerId) {
        if (filtering.chatOwnerId === "shared" && filtering.userId) {
            // get only the shared ones if "shared" (Whatever does not have the user id as id)
            filterQuery["chat.owner._id"] = { $ne: filtering.userId };
        } else {
            // Otherwise get whatever owner was passed as parameter
            filterQuery["chat.owner._id"] = filtering.chatOwnerId;
        }
    }
    if (filtering.textSearch) filterQuery.$text = { $search: filtering.textSearch };
    if (filtering.userId) filterQuery["user._id"] = filtering.userId;
    if (filtering.hasJoined !== undefined && filtering.hasJoined !== null)
        filterQuery.hasJoined = Boolean(filtering.hasJoined);

    return colaborator
        .find(filterQuery)
        .sort(`${resultsProcessing.sort} _id`)
        .skip(resultsProcessing.skip)
        .limit(resultsProcessing.limit)
        .lean();
};

/**
 * Gets a list of collaborators from a chat by id and applies a text search on user attributes (on names, last names and email).
 *
 * @param {string} chatId Id of the chat from which to get the collaborators instances from.
 * @param {Object} [filtering={}] Filtering options.
 * @param {string} [filtering.textSearch=undefined] Text search query applied to the user name, last names and email of the collaborator instance.
 * @param {string} [filtering.chatOwnerId=undefined] Chat owner ID filter.
 * @param {Object} [resultsProcessing={}] Results processing options.
 * @param {number} [resultsProcessing.skip=0] Number of items to skip from the beggining of the results.
 * @param {number} [resultsProcessing.limit=undefined] Limit of items to retrieve.
 * @param {string} [resultsProcessing.sort=undefined] Sorting criteria.
 * @returns All matching colaborator instances from that chat
 */
const getAllByChatAndUserTextMatch = async (
    chatId,
    filtering = { textSearch: undefined, chatOwnerId: undefined },
    resultsProcessing = { skip: 0, limit: undefined, sort: undefined }
) => {
    const filterQuery = { "chat._id": chatId };
    if (filtering.chatOwnerId) filterQuery["chat.owner._id"] = filtering.chatOwnerId;
    if (filtering.textSearch) {
        const regexp = { $regex: `^${filtering.textSearch.toLowerCase()}` };

        filterQuery.$or = [{ "user.names": regexp }, { "user.lastnames": regexp }, { "user.email": regexp }];
    }
    return colaborator
        .find(filterQuery)
        .sort(`${resultsProcessing.sort} _id`)
        .skip(resultsProcessing.skip)
        .limit(resultsProcessing.limit)
        .lean();
};

/**
 * Gets a colaborator instance by chat id and colaborator user id.
 * @param {string} chatId Id of the chat to retrieve.
 * @param {string} userId Id of the colaborator user.
 * @param {boolean | null} [hasJoined] Whether it should look for users who have joined or not. If false, only returns those who haven't joined to the chat. If null it returns everything. By default returns only those who have joined.
 * @returns The saved collaborator with that id and that chat user.
 */
const getByChatAndUser = async (chatId, userId, hasJoined = true) => {
    if (!chatId || !userId) throw Error("Missing parameters");

    const filters = { "chat._id": chatId, "user._id": userId };
    if (hasJoined !== null) {
        filters.hasJoined = hasJoined;
    }

    return colaborator.findOne(filters).lean();
};

/**
 * Gets a colaborator instance by chat id, owner id and colaborator user id.
 * @param {string} chatId Id of the chat to retrieve.
 * @param {string} ownerId Id of the owner of the chat.
 * @param {string} userId Id of the user of the chat.
 * @returns The saved collaborator with that id, that chat owner and that chat user.
 */
const getByChatOwnerAndUser = async (chatId, ownerId, userId) => {
    if (!chatId || !userId || !ownerId) throw Error("Missing parameters");

    return colaborator.findOne({ "chat._id": chatId, "chat.owner._id": ownerId, "user._id": userId }).lean();
};

/**
 * Updates a collaborator instance by the chat it belongs to, the owner of the chat and the user of the chat.
 * @param {*} updatedCollaborator The updates to be applied to the collaborator instance
 * @param {string} chatId The id of the chat from which to update the collaborator instance
 * @param {string} ownerId The id of the owner of the chat from which to update the collaborator instance
 * @param {string} userId The id of the user whose collaborator instance is being updated
 * @returns The collaborator instance as it is after being updated.
 */
const updateByChatOwnerAndUser = async (updatedCollaborator, chatId, ownerId, userId) => {
    if (!chatId || !ownerId || !userId || !updatedCollaborator) throw Error("Missing Parameters");

    const updatedCollab = await colaborator.findOneAndUpdate(
        {
            "chat._id": chatId,
            "chat.owner._id": ownerId,
            "user._id": userId,
        },
        updatedCollaborator,
        { new: true, runValidators: true }
    );

    return updatedCollab;
};

/**
 * Updates a collaborator instance by the chat it belongs to, the user of the chat and the has joined state of that user.
 * @param {*} updatedCollaborator The updates to be applied to the collaborator instance
 * @param {string} chatId The id of the chat from which to update the collaborator instance
 * @param {string} userId The id of the user whose collaborator instance is being updated
 * @param {boolean} hasJoined True if the update should be done where the user of this collaboration instance has joined its chat and false otherwise
 * @returns The collaborator instance as it is after being updated.
 */
const updateByChatUserAndHasJoined = async (updatedCollaborator, chatId, userId, hasJoined) => {
    if (!chatId || !userId || hasJoined === null || hasJoined === undefined || !updatedCollaborator)
        throw Error("Missing Parameters");

    const updatedCollab = await colaborator.findOneAndUpdate(
        {
            "chat._id": chatId,
            "user._id": userId,
            hasJoined,
        },
        updatedCollaborator,
        { new: true, runValidators: true }
    );

    return updatedCollab;
};

/**
 * Deletes a collaborator instance from a chat by chat id, chat owner id and user id.
 * @param {*} chatId The id of the chat from which to delete the collaborator instance
 * @param {*} ownerId The id of the owner of the chat from which to delete the collaborator instance
 * @param {*} userId The id of the user whose collaborator instance is being deleted
 * @returns The collaborator instance as it was before deletion.
 */
const deleteByChatOwnerAndUser = async (chatId, ownerId, userId) => {
    if (!chatId || !ownerId || !userId) throw Error("Missing parameters");

    // Try to delete the collaborator
    const deletedCollab = await colaborator.findOneAndDelete({
        "chat._id": chatId,
        "chat.owner._id": ownerId,
        "user._id": userId,
    });

    // If no collab was found return it, otherwise remove redundancies
    if (!deletedCollab) {
        return deletedCollab;
    }

    // Delete the notification of this collab invitation
    await notification.findOneAndDelete({
        "type.name": notifications.types.names.chatInvitation,
        "relatedEntityType.name": notifications.relatedEntities.chat,
        relatedEntityId: deletedCollab.chat._id,
        "to._id": deletedCollab.user._id,
    });

    // Delete all messages this collab made
    await message.deleteMany({ colaborator: deletedCollab._id });

    return deletedCollab;
};

export default {
    save,
    getAllBy,
    getByChatAndUser,
    getAllByChatAndUserTextMatch,
    getByChatOwnerAndUser,
    updateByChatOwnerAndUser,
    updateByChatUserAndHasJoined,
    deleteByChatOwnerAndUser,
};
