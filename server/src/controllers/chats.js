import { StatusCodes } from "http-status-codes";
import chatsService from "../services/chats/chats.js";
import { SuccessPayload } from "../utils/responsebodies/index.js";

/** Controller that handles all requests related to chat creation */
const create = async (req, res) => {
    const documents = req.files;
    const chat = req.body;
    const user = req.user;

    const savedChat = await chatsService.create(chat, documents, user._id);

    return res.status(StatusCodes.CREATED).json(new SuccessPayload(savedChat));
};

export default { create };
