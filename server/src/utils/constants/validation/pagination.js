/** Contains all pagination query validation values to be used in the application. */
export default Object.freeze({
    page: {
        /** Minimum value for a page query param */
        MIN: 1,
        /** Maximum  value for a page query param */
        MAX: Number.MAX_SAFE_INTEGER,
    },
    limit: {
        /** Minimum value for a limit of items per page query param */
        MIN: 1,
        /** Maximum  value for a limit of items per page query param */
        MAX: 500,
    },
});
