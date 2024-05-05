import { StatusCodes } from "http-status-codes";
import loggingService from "../../services/logging/logging.js";
import { messages, validation } from "../../utils/constants/index.js";

/**
 * Middleware that captures requests and responses to log
 * HTTP requests and all related metadata persistantly in database.
 */
const reqResLogger = (req, res, next) => {
    // Get the request timestamp when it arrived to calculate overall time
    const requestStartTime = Date.now();

    // Save the original response function
    const originalJsonFunc = res.json;

    // Use this flag to avoid logging more than once
    let responseSent = false;

    // Extend the json function to do logging
    res.json = function (resBody) {
        if (!responseSent) {
            if (res.statusCode < StatusCodes.BAD_REQUEST) {
                loggingService.save({
                    level: validation.logs.levels.INFO,
                    message: messages.info.REQUEST_SUCCESS,
                    req,
                    res,
                    resBody,
                    requestStartTime,
                });
            } else {
                loggingService.save({
                    level: validation.logs.levels.ERROR,
                    message: messages.errors.REQUEST_FAILURE,
                    req,
                    res,
                    resBody,
                    requestStartTime,
                    caughtError: req.caughtError,
                });
            }

            responseSent = true;
        }

        // Call the original response function
        return originalJsonFunc.call(this, resBody);
    };

    // Continue processing the request
    next();
};

export default reqResLogger;
