/**
 * Abstraction of an API Error,
 * defines what an API error should be like server wide.
 * 
 * Has a message and an HTTP Status.
 */
export default class ApiError extends Error {
    /**
     * Creates a new API Error
     * @param {String} message Error message
     * @param {Number} status HTTP status code that corresponds to the error
     */
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
