import { colaborator } from "../../models/colaborator/colaborator.js";

/**
 * Saves a new colaborator in the database for a chat and a user.
 * @param {*} newColaborator The colaborator to be saved
 * @returns The saved colaborator
 */
const save = async (newColaborator) => colaborator.create(newColaborator);

/**
 * Retrieves all colaborator instances based on provided parameters.
 * @param {Object} [filtering={}] Filtering options.
 * @param {string} [filtering.textSearch=undefined] Text search query.
 * @param {(string|null|undefined)} [filtering.chatOwnerId=undefined] Chat owner ID filter. Can be a valid ID, null, undefined, or 'shared'. If shared and userId provided, values are filtered for that user where ownerId is not equal to them.
 * @param {string} [filtering.userId=undefined] Id of the user colaborator for additional filtering.
 * @param {Object} [resultsProcessing={}] Results processing options.
 * @param {number} [resultsProcessing.skip=0] Number of items to skip from the beggining of the results.
 * @param {number} [resultsProcessing.limit=undefined] Limit of items to retrieve.
 * @param {string} [resultsProcessing.sort=undefined] Sorting criteria.
 * @returns All matching colaborator instances
 */
const getAllBy = async (
    filtering = { textSearch: undefined, chatOwnerId: undefined, userId: undefined },
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

    return colaborator
        .find(filterQuery)
        .sort(`${resultsProcessing.sort} _id`)
        .skip(resultsProcessing.skip)
        .limit(resultsProcessing.limit)
        .lean();
};

/**
 * Gets a colaborator instance by id and colaborator user id.
 * @param {string} chatId Id of the chat to retrieve.
 * @param {string} userId Id of the colaborator user.
 * @returns The saved chat with that id and that colaborator.
 */
const getByChatAndUser = async (chatId, userId) => colaborator.findOne({ "chat._id": chatId, "user._id": userId });

export default { save, getAllBy, getByChatAndUser };
