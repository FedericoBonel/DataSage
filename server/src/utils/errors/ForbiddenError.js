import { StatusCodes, ReasonPhrases } from "http-status-codes";
import ApiError from "./ApiError.js";

/**
 * Abstraction of a Forbidden error,
 * set the http status of the error to 403.
 * These errors are due to the user not having provided credentials with the permissions required for the resource.
 */
export default class ForbiddenError extends ApiError {
    /**
     * Constructs a new API error of type Forbidden Error to mark that the API user has not provided credentials with the required permissions.
     * @param {String} message Optional message explaining the error, if not provided it is set to "Forbidden"
     */
    constructor(message = ReasonPhrases.FORBIDDEN) {
        super(message);
        this.status = StatusCodes.FORBIDDEN;
    }
}
