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

/** Controller that handles all requests that ask for a list of participants */
const get = async (req, res) => {
    const { chatId } = req.params;
    const { textSearch, page, limit } = req.query;
    const user = req.user;

    const savedParticipants = await participantsServices.getByChatId(chatId, user._id, { textSearch }, { limit, page });

    res.status(StatusCodes.OK).json(new SuccessPayload(savedParticipants));
};

/** Controller that handles all requests that ask for a participant by id */
const getById = async (req, res) => {
    const { chatId, participantId } = req.params;
    const user = req.user;

    const savedParticipant = await participantsServices.getById(participantId, chatId, user._id);

    res.status(StatusCodes.OK).json(new SuccessPayload(savedParticipant));
};

/** Controller that handles all requests that ask for the deletion of a participant from a chat by id */
const deleteById = async (req, res) => {
    const { chatId, participantId } = req.params;
    const user = req.user;

    const deletedParticipant = await participantsServices.deleteById(participantId, chatId, user._id);

    res.status(StatusCodes.OK).json(new SuccessPayload(deletedParticipant));
};

export default { create, get, getById, deleteById };
