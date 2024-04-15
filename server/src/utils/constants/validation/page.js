/** Contains all document page validation values to be used in the application. */
export default Object.freeze({
    vector: {
        /** Length of the vector representing the page content. This must be synced up with the embeddings model being used. */
        LENGTH: 1536
    },
    generation: {
        /** Maximum number of pages to be considered as context by the AI when generating a response */
        MAX_TO_USE: 20,
    }
});
