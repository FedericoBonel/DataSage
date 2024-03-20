import { StatusCodes, ReasonPhrases } from "http-status-codes";
import ApiError from "./ApiError.js";

/**
 * Abstraction of an error of type Not Found,
 * sets the http status of the error to 404.
 * These errors are due to the fact that the request has requested access to a non-existent resource.
 */
export default class NotFoundError extends ApiError {
    /**
     * Constructs a new API error of type Not Found to flag requests that have requested access to a non-existent resource.
     * @param {String} message Optional message explaining the error, if not provided it is set to "Not Found!"
     */
    constructor(message = ReasonPhrases.NOT_FOUND) {
        super(message);
        this.status = StatusCodes.NOT_FOUND;
    }
}