import { StatusCodes } from "http-status-codes";
import participationsServices from "../services/participations/participations.js";
import { SuccessPayload } from "../utils/responsebodies/index.js";

/** Controller that handles requests that ask to join a chat after receiving an invitation. */
const create = async (req, res) => {
    const { chatId } = req.params;
    const user = req.user;

    const savedParticipation = await participationsServices.joinChatById(chatId, user._id);

    res.status(StatusCodes.CREATED).json(new SuccessPayload(savedParticipation));
};

/** Controller that handles requests that ask to leave a chat after accessing it. */
const deleteById = async (req, res) => {
    const { chatId } = req.params;
    const user = req.user;

    const deletedParticipation = await participationsServices.leaveChatById(chatId, user._id);

    res.status(StatusCodes.OK).json(new SuccessPayload(deletedParticipation));
};

export default { create, deleteById };
