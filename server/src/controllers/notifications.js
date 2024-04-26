import { StatusCodes } from "http-status-codes";
import { SuccessPayload } from "../utils/responsebodies/index.js";
import notificationsServices from "../services/notifications/notifications.js";

/** Controller that handles all requests that check for the total amount of a logged in user not read notifications */
const checkNotReadCount = async (req, res) => {
    const user = req.user;

    const notReadCount = await notificationsServices.getNotReadCount(user._id);

    return res.status(StatusCodes.OK).json(new SuccessPayload(notReadCount));
};

export default { checkNotReadCount };
