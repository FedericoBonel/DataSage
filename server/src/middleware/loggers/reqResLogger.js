import { StatusCodes } from "http-status-codes";
import { persistantLogger, formatHTTPReqRes } from "../../utils/loggers/index.js";
import { messages } from "../../utils/constants/index.js";

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

    // Extend the json function to append logging
    res.json = function (body) {
        if (!responseSent) {
            if (res.statusCode < StatusCodes.BAD_REQUEST) {
                persistantLogger.info(
                    messages.info.REQUEST_SUCCESS,
                    formatHTTPReqRes(req, res, body, requestStartTime)
                );
            } else {
                persistantLogger.error(
                    messages.errors.REQUEST_FAILURE,
                    formatHTTPReqRes(req, res, body, requestStartTime, req.caughtError)
                );
            }

            responseSent = true;
        }

        // Call the original response function
        return originalJsonFunc.call(this, body);
    };

    // Continue processing the request
    next();
};

export default reqResLogger