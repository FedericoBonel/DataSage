/** Contains all chat validation values to be used in the application. */
export default Object.freeze({
    name: {
        /** Minimum length of a chat name */
        MIN_LENGTH: 1,
        /** Maximum length of a chat name */
        MAX_LENGTH: 32,
    },
    documents: {
        /** Maximum number of documents per chat */
        MAX_AMOUNT: 10,
    },
});
