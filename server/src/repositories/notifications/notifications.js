import { Types } from "mongoose";
import { notification } from "../../models/notification/notification.js";

/**
 * Saves a notification in database and returns its saved version
 * @param {*} newNotification Notification to be saved in the database
 * @returns The saved notification with an assigned id and any other automatic fields
 */
const save = (newNotification) => notification.create(newNotification);

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

export default { save, countByIsReadAndTo };
