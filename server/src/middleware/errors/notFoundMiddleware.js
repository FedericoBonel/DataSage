import { messages } from "../../utils/constants/index.js";
import { NotFoundError } from "../../utils/errors/index.js";

/**
 * Middleware that handles all the requests that could not be handled by any existing route
 * @throws {NotFoundError} whenever executed
 */
const pathNotFound = async (req, res) => {
    throw new NotFoundError(messages.errors.ROUTE_NOT_FOUND);
};

export default pathNotFound;
