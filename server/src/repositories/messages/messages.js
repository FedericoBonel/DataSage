import { message } from "../../models/message/message.js";

/**
 * Retrieves all messages based on provided parameters.
 * @param {Object} [filtering={}] Filtering options.
 * @param {string} [filtering.colaboratorId=undefined] Id of the colaborator that sent or received the message.
 * @param {Object} [resultsProcessing={}] Results processing options.
 * @param {number} [resultsProcessing.skip=0] Number of items to skip from the beggining of the results.
 * @param {number} [resultsProcessing.limit=undefined] Limit of items to retrieve.
 * @param {string} [resultsProcessing.sort=undefined] Sorting criteria.
 * @returns All matching messages
 */
const getAllBy = (
    filtering = { colaboratorId: undefined },
    resultsProcessing = { skip: 0, limit: undefined, sort: undefined }
) => {
    const filters = {};
    if (filtering.colaboratorId) filters.colaborator = filtering.colaboratorId;

    return message
        .find(filters)
        .sort(`${resultsProcessing.sort} _id`)
        .skip(resultsProcessing.skip)
        .limit(resultsProcessing.limit)
        .lean();
};

/**
 * Saves all the messages in database
 * @param {*} messages All the messages to be saved in database.
 */
const saveAll = async (messages) => message.insertMany(messages);

export default { getAllBy, saveAll };
