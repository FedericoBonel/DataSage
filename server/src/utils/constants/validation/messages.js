/** Contains all chat messages validation values to be used in the application. */
export default Object.freeze({
    /** Minimum length of a chat message */
    MIN_LENGTH: 1,
    /** Maximum length of a chat message */
    MAX_LENGTH: 20000,
    /** Allowed values for receiver and sender of a chat message */
    actors: {
        AI: "AI",
        human: "Human",
    },
    sources: {
        /** Maximum number of sources for a message */
        LIMIT: 5,
    },
});
