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

/** Controller that handles all requests related to chat listing and searching */
const get = async (req, res) => {
    const { ownership, textSearch, limit, page } = req.query;
    const user = req.user;

    const savedChats = await chatsService.get(user._id, { ownership, textSearch }, { limit, page });

    return res.status(StatusCodes.OK).json(new SuccessPayload(savedChats));
};

export default { create, get };