import { StatusCodes } from "http-status-codes";
import ApiResPayload from "./ApiResPayload.js";
import { ApiError } from "../errors/index.js";

/**
 * @openapi
 * components:
 *   schemas:
 *     ErrorPayload:
 *       description: An error response payload.
 *       allOf:
 *         - $ref: "#/components/schemas/ApiPayload"
 *         - type: Object
 *           required:
 *             - errorMsg
 *           properties:
 *             errorMsg:
 *               type: string
 *               description: Reason of why the error happened.
 *             errors:
 *               type: array
 *               description: A list of errors when the error is of type Bad Request. This list will contain more specific information about why the request failed. (Fields that are wrong, etc.)
 *               items:
 *                 type: object
 *                 properties:
 *                   msg:
 *                     type: string
 *                     description: Reason of why this specific field triggers an error.
 *                   errorField:
 *                     type: string
 *                     description: Field in the request payload that has triggered this error.
 *                   location:
 *                     type: string
 *                     description: Location of the field in the request that is badly formatted (i.g., body, headers, etc.).
 *   responses:
 *     400Response:
 *       description: Some of the data (request payload field, parameter or identifier) provided is invalid.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorPayload'
 *     401Response:
 *       description: The access token attached to the request is non-existent or invalid.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorPayload'
 *     403Response:
 *       description: The token attached to the request does not have the required permissions to make the request.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorPayload'
 *     404Response:
 *       description: Some of the data (URL, body property, parameter or identifier) provided is not found in the system.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorPayload'
 */
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
