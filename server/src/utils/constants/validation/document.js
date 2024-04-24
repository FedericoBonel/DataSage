/** Contains all document validation values to be used in the application. */
export default Object.freeze({
    name: {
        /** Minimum length of a document name (it needs to provide the file extension) */
        MIN_LENGTH: 4,
        /** Maximum length of a document name */
        MAX_LENGTH: 255,
    },
    storeId: {
        /** Minimum length of a document store name */
        MIN_LENGTH: 1,
        /** Maximum length of a document store name */
        MAX_LENGTH: 255,
    },
    size: {
        /** Maximum size of a document in bytes */
        MAX_BYTES: 10 * 1024 * 1024, // (MB, KB, B)
    },
    pages: {
        /** Maximum number of pages per document */
        MAX_PAGES: 200,
    },
    extensions: {
        /** Supported documents extensions */
        ".pdf": true,
    }
});
