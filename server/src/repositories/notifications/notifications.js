import { Types } from "mongoose";
import { notification } from "../../models/notification/notification.js";

/**
 * Saves a notification in database and returns its saved version
 * @param {*} newNotification Notification to be saved in the database
 * @returns The saved notification with an assigned id and any other automatic fields
 */
const save = (newNotification) => notification.create(newNotification);

/**
 * Retrieves all notifications based on provided parameters.
 * @param {Object} [filtering] Filtering options.
 * @param {string} [filtering.toId] The id of the receiver of the notifications to retrieve.
 * @param {boolean} [filtering.isRead] Is read value for which to filter the results by.
 * @param {Object} [resultsProcessing] Results processing options.
 * @param {number} [resultsProcessing.skip] Number of items to skip from the beggining of the results.
 * @param {number} [resultsProcessing.limit] Limit of items to retrieve.
 * @param {string} [resultsProcessing.sort] Sorting criteria.
 * @returns All matching notifications
 */
const getAllBy = async (
    filtering = { toId: undefined, isRead: undefined },
    resultsProcessing = { skip: 0, limit: undefined, sort: undefined }
) => {
    const filterQuery = {};
    if (filtering.toId) filterQuery["to._id"] = filtering.toId;
    if (filtering.isRead !== undefined || filtering.isRead !== null) filterQuery.isRead = Boolean(filtering.isRead);

    return notification
        .find(filterQuery)
        .sort(`${resultsProcessing.sort} _id`)
        .skip(resultsProcessing.skip)
        .limit(resultsProcessing.limit)
        .lean();
};

/**
 * Counts notifications based on their read status and recipient id.
 * @param {boolean} isRead The read status of the notifications for the recipient.
 * @param {string} toId The Id of the recipient user.
 * @returns The count of notifications for the given recipient.
 */
const countByIsReadAndTo = async (isRead, toId) => {
    if (isRead === null || isRead === undefined || !toId) {
        throw Error("Missing parameters");
    }

    const aggregateRes = await notification
        .aggregate()
        .match({ "to._id": new Types.ObjectId(toId), isRead })
        .count("notReadCount");

    return aggregateRes[0] || { notReadCount: 0 };
};

/**
 * Updates a notification by id and receiver id.
 * @param {*} updates Updates to be applied to the notification if found.
 * @param {string} notificationId The id of the notification to be updated
 * @param {string} toId The receivers id of the notification
 * @returns The notification as it is after update. If no such notification was found returns null.
 */
const updateByIdAndTo = async (updates, notificationId, toId) => {
    if (!updates || !notificationId || !toId) {
        throw Error("Missing parameters");
    }

    const updatedNotification = notification.findOneAndUpdate({ _id: notificationId, "to._id": toId }, updates, {
        new: true,
        runValidators: true,
    });

    return updatedNotification;
};

export default { save, getAllBy, countByIsReadAndTo, updateByIdAndTo };
