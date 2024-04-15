import { StatusCodes } from "http-status-codes";
import messagesService from "../services/messages/messages.js";

/** Controller that handles all requests that send a message to a chat and generate an AI response. */
const generateResponse = async (req, res) => {
    const { chatId } = req.params;
    const { content } = req.body;
    const user = req.user;

    const generatedResponse = await messagesService.generateResponse(content, chatId, user._id);

    res.status(StatusCodes.CREATED).json(generatedResponse);
};

export default { generateResponse };
