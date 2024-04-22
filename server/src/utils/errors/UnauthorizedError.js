import { StatusCodes, ReasonPhrases } from "http-status-codes";
import ApiError from "./ApiError.js";

/**
 * Abstraction of an Unauthorized error,
 * set the http status of the error to 401.
 * These errors are due to the user not providing valid credentials for the required resource.
 */
export default class UnauthorizedError extends ApiError {
    /**
     * Constructs a new API error of type Unauthorized Error to mark that the API user has not provided valid credentials.
     * @param {String} message Optional message explaining the error, if not provided it is set to "Unauthorized"
     */
    constructor(message = ReasonPhrases.UNAUTHORIZED) {
        super(message);
        this.status = StatusCodes.UNAUTHORIZED;
    }
}
