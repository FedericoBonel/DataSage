import { StatusCodes } from "http-status-codes";
import { SuccessPayload } from "../utils/responsebodies/index.js";
import notificationsServices from "../services/notifications/notifications.js";

/** Controller that handles all requests that ask for a list of notifications */
const get = async (req, res) => {
    const user = req.user;
    const { isRead, limit, page } = req.query;

    const foundNotifications = await notificationsServices.get(user._id, { isRead }, { limit, page });

    return res.status(StatusCodes.OK).json(new SuccessPayload(foundNotifications));
};

/** Controller that handles all requests that check for the total amount of a logged in user not read notifications */
const checkNotReadCount = async (req, res) => {
    const user = req.user;

    const notReadCount = await notificationsServices.getNotReadCount(user._id);

    return res.status(StatusCodes.OK).json(new SuccessPayload(notReadCount));
};

/** Controller that handles all requests that update a notification by id */
const updateById = async (req, res) => {
    const { notificationId } = req.params;
    const updatedNotification = req.body;
    const user = req.user;

    const savedNotification = await notificationsServices.updateById(updatedNotification, notificationId, user._id);

    return res.status(StatusCodes.OK).json(new SuccessPayload(savedNotification));
};

export default { get, checkNotReadCount, updateById };
