import { formatHTTPReqRes } from "../../utils/loggers/index.js";

/**
 * @typedef {Object} LogInputDTO
 * @property {"error"|"warn"|"info"|"http"|"verbose"|"debug"|"silly"} level The log level to use for the message.
 * @property {*} req The request as it comes directly from express
 * @property {*} res The response as it comes directly from express
 * @property {*} resBody The response body as it is being returned to the client
 * @property {String} message The message to be written in the log
 * @property {number} requestStartTime The timestamp in miliseconds of when the HTTP request started
 * @property {Error} [caughtError] The error thrown or caught. If the log is of level error then this will be used to log all the error information in the log.
 */

/**
 * Formats log data comming from HTTP requests and responses to how they should be stored permanently.
 * @param {LogInputDTO} logDTO The log to be formatted
 * @returns The formatted log object to be stored in database.
 */
const toLogModel = (logDTO) => {
    const meta = formatHTTPReqRes(
        logDTO.req,
        logDTO.res,
        logDTO.resBody,
        logDTO.requestStartTime,
        logDTO.caughtError
    );

    return { level: logDTO.level, message: logDTO.message, meta };
};

export default { toLogModel };
