import { StatusCodes, ReasonPhrases } from "http-status-codes";
import ApiError from "./ApiError.js";

/**
 * Abstraction of a Bad Request error,
 * sets the http status of the error to 400.
 *
 * These errors are triggered when there is something wrong with the request and the user should fix it.
 */
export default class BadRequestError extends ApiError {
    /**
     * Constructs a new API error of type Bad Request to mark requests that were incorrect for some reason.
     * @param {String} message Optional message explaining the error, if not provided it is set to "Bad Request" 
     * @param {Array.<Object>} errors Optional attribute containing the fields of the request that are incorrect.
     */
    constructor(message = ReasonPhrases.BAD_REQUEST, errors = []) {
        super(message);
        this.status = StatusCodes.BAD_REQUEST;
        this.errors = errors;
    }
}
