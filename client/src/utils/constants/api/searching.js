export default Object.freeze({
    /** Search parameters values for chats */
    chats: {
        /** Allowed values for ownership filtering. ["self", "shared"] */
        owner: ["self", "shared"],
    },
    /** Search parameter values for text searching */
    textSearch: {
        /** Max length of a text search query */
        MAX_LENGTH: 255,
    },
});
