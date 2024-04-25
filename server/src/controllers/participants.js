import { StatusCodes } from "http-status-codes";
import { SuccessPayload } from "../utils/responsebodies/index.js";

/** Controller that add a participant to a chat by id and user email. */
const create = async (req, res) => {

    res.status(StatusCodes.CREATED).json(new SuccessPayload("nice"))
};

export default { create };
