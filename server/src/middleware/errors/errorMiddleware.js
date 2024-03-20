import { StatusCodes } from "http-status-codes";

import { messages } from "../../utils/constants/index.js";
import { ApiError } from "../../utils/errors/index.js";
import { ErrorPayload } from "../../utils/responsebodies/index.js";
import { logger } from "../../utils/loggers/index.js";

/**
 * Middleware that receives all the errors that occur
 * within asynchronous functions on the server
 * and returns them as HTTP responses to the API user
 */
const errorHandler = async (err, req, res, next) => {
    logger.error(err.stack ?? "");
    let serverError = err;

    // If the error wasn't defined  by us, we create a generic server error
    if (!err.status) {
        serverError = new ApiError(
            err.message || messages.errors.INTERNAL_SERVER_ERROR,
            err.status || StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
    res.status(serverError.status).json(new ErrorPayload(serverError));
};

export default errorHandler;
