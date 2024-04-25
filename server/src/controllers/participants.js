import { StatusCodes } from "http-status-codes";
import participantsServices from "../services/participants/participants.js";
import { SuccessPayload } from "../utils/responsebodies/index.js";

/** Controller that handles requests that ask to add a participant to a chat by id and user email. */
const create = async (req, res) => {
    const { chatId } = req.params;
    const user = req.user;
    const newParticipant = req.body;

    const savedParticipant = await participantsServices.createByChatId(newParticipant, chatId, user);

    res.status(StatusCodes.CREATED).json(new SuccessPayload(savedParticipant));
};

export default { create };
