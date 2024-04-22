import { StatusCodes } from "http-status-codes";
import messagesService from "../services/messages/messages.js";
import { SuccessPayload } from "../utils/responsebodies/index.js";

/** Controller that handles all requests that ask for message history */
const get = async (req, res) => {
    const { chatId } = req.params;
    const { limit, page } = req.query;
    const user = req.user;

    const chatHistory = await messagesService.getByChatId(user._id, chatId, { limit, page });

    return res.status(StatusCodes.OK).json(new SuccessPayload(chatHistory));
};

/** Controller that handles all requests that send a message to a chat and generate an AI response. */
const generateResponse = async (req, res) => {
    const { chatId } = req.params;
    const { content } = req.body;
    const user = req.user;

    const generatedResponse = await messagesService.generateResponse(content, chatId, user._id);

    res.status(StatusCodes.CREATED).json(new SuccessPayload(generatedResponse));
};

export default { generateResponse, get };
