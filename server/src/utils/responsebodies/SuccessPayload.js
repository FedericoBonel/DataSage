import ApiResPayload from "./ApiResPayload.js";

/**
 * @openapi
 * components:
 *   schemas:
 *     SuccessApiPayload:
 *       description: A successful response payload
 *       allOf:
 *         - $ref: '#/components/schemas/ApiPayload'
 */
/**
 * Abstracts the payload of a successful response.
 * Assigns the success value to true and adds a field with the associated data if provided.
 */
export default class SuccessPayload extends ApiResPayload {
    /**
     * Constructs a successful response body for the api with the data to be returned.
     * @param {*} data Data to be returned in response body
     */
    constructor(data) {
        super(true);
        this.data = data;
    }
}