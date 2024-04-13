import { StatusCodes } from "http-status-codes";
import { SuccessPayload } from "../utils/responsebodies/index.js";
import docsServices from "../services/documents/documents.js";

/** Controller that handles all requests that ask for a list of documents of a chat */
const getByChatId = async (req, res) => {
    const { chatId } = req.params;

    const foundDocs = await docsServices.getByChatId(chatId);

    return res.status(StatusCodes.OK).json(new SuccessPayload(foundDocs));
};

export default { getByChatId };
