/** 
 * Formats data in a mock successful response to set in a query cache.
 * @param {*} data The data the server returned
 * @returns the formatted data
 */
export const mockSuccessfulRes = (data) => ({
    success: true,
    data,
});
