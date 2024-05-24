import { StatusCodes, ReasonPhrases } from "http-status-codes";
import ApiError from "./ApiError.js";

/**
 * Abstraction of an Internal Server Error,
 * sets the http status of the error to 500.
 * These errors are due to the server running on an unexpected or expected internal error that is not due to the user doing something wrong.
 */
export default class InternalServerError extends ApiError {
    /**
     * Constructs a new API error of type Interal Server Error to mark that the server has run into an unexpected INTERNAL error.
     * @param {String} message Optional message explaining the error, if not provided it is set to "Internal Server Error"
     */
    constructor(message = ReasonPhrases.INTERNAL_SERVER_ERROR) {
        super(message);
        this.status = StatusCodes.INTERNAL_SERVER_ERROR;
    }
}
