/** Contains all chat messages validation values to be used in the application. */
export default Object.freeze({
    /** Minimum length of a chat message */
    MIN_LENGTH: 1,
    /** Maximum length of a chat message created by the user */
    MAX_LENGTH: 4096,
    /** Maximum length of a chat message in DATABASE */
    MAX_LENGTH_DB: 20000,
    /** Allowed values for receiver and sender of a chat message */
    actors: {
        AI: "AI",
        human: "Human",
    },
    sources: {
        /** Maximum number of sources for a message */
        LIMIT: 5,
    },
    generation: {
        /** Maximum number of messages to be considered as history by the AI when generating a response */
        MAX_HISTORY: 10,
    }
});
