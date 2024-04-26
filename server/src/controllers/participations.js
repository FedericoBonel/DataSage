import { StatusCodes } from "http-status-codes";
import participationsServices from "../services/participations/participations.js";
import { SuccessPayload } from "../utils/responsebodies/index.js";

/** Controller that handles requests that ask to join a chat after receiving an invitation. */
const create = async (req, res) => {
    const { chatId } = req.params;
    const user = req.user;

    const savedParticipant = await participationsServices.joinChatById(chatId, user._id);

    res.status(StatusCodes.CREATED).json(new SuccessPayload(savedParticipant));
};

export default { create };
