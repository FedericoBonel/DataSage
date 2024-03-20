import { StatusCodes } from "http-status-codes";
import ApiResPayload from "./ApiResPayload.js";
import { ApiError } from "../errors/index.js";

/**
 * Abstracts the payload of an error response.
 * Assigns the success value to false and adds a field with the errors encountered.
 */
export default class ErrorPayload extends ApiResPayload {
    /**
     * Constructs an error response body for the api with the error to be returned.
     * @param {ApiError} error Error to be returned, if it is of type "BAD_REQUEST" a field "errors" will be added with the errors in the received request.
     */
    constructor(error) {
        super(false);
        this.errorMsg = error.message;
        // If the error is bad request some fields may be wrong, check if the error contains an errors property and add them to the response
        if (error.status === StatusCodes.BAD_REQUEST && error.errors?.length) {
            this.errors = error.errors;
        }
    }
}
