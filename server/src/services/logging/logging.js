import loggingRepository from "../../repositories/logging/logging.js";
import loggingDTO from "../../dtos/logging/index.js";

/**
 * @typedef {Object} LogInputDTO
 * @property {"error"|"warn"|"info"|"http"|"verbose"|"debug"|"silly"} level The log level to use for the message.
 * @property {*} req The request as it comes directly from express
 * @property {*} res The response as it comes directly from express
 * @property {*} resBody The response body as it is being returned to the client
 * @property {String} message The message to be written in the log
 * @property {number} requestStartTime The timestamp in miliseconds of when the request started
 * @property {Error} [caughtError] The error thrown or caught. If the log is of level error then this will be used to log all the error information in the log.
 */

/**
 * Saves a new http req res log to database
 * @param {LogInputDTO} newLog The log to be saved in database
 */
const save = async (newLog) => {
    await loggingRepository.create(loggingDTO.toLogModel(newLog));
};

export default { save };
