/**
 * Abstracts the payload of a basic API response.
 */
export default class ApiResponse {
    /**
     * Construct a basic response payload for the api.
     * @param {Boolean} success Success value, true if response succeeds, false otherwise
     */
    constructor(success) {
        this.success = success;
    }
}
