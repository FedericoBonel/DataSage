export default {
    /** The label to be shown in the file selection field of chat documents. */
    FILE_FIELD:
        "Select or drag and drop your files\n(only up to 10 PDF files that weight less than 10MB are allowed for now)",
    /** The message to be shown when an invalid file has been selected in the file selection field of chat documents. */
    FILE_FIELD_INVALID_ALERT:
        "Invalid files selected. Only valid ones will be uploaded.",
    /** Creates the message to show to the user when more than one file is selected in the file selection field of chat documents. */
    createFilesSelectedFeedback: (numberFiles) =>
        `${numberFiles} files selected`,
    /** Contains all messages to be shown in listing documents of a chat. */
    list: {
        /** Creates a message to be shown when listing documents for a chat. It tells the user how many files have been uploaded */
        createFilesUploadedMessage: (numberDocuments) =>
            `${numberDocuments} uploaded document${
                numberDocuments > 1 ? "s" : ""
            }`,
    },
    /** Contains all messages to be shown in the upload section of chat documents */
    upload: {
        /** Message to be shown to the user when the maximum amount of documents has been reached for a chat. */
        MAX_REACHED:
            "No more documents can be uploaded to this chat. The limit has been reached.",
        /** Contains messages to be shown to the user in the upload form of chat documents. */
        form: {
            /** Contains the messages to be shown to the user in document forms to upload and cancel upload. */
            buttons: {
                /** Message to be shown to the user when accepting upload of documents. */
                ACCEPT: "Upload documents",
                /** Message to be shown to the user when canceling upload of documents. */
                CANCEL: "Remove documents",
            },
        },
    },
    /** Contains all messages to be shown in the delete section of chat documents */
    delete: {
        /** Contains all messages to be shown in the delete form of chat documents. */
        form: {
            /** Message to be shown in the title of the delete form of chat documents. */
            TITLE: "Deleting File",
            /** Message to be shown in the body of the delete form of chat documents. It takes the form of a question to ask the user to confirm or cancel deletion. */
            QUESTION:
                "You are deleting a file. The content of the file will stop being known by the chat and you wont be able to ask questions about it any longer. All its data will be removed from the system.\nDo you wish to delete this file?",
        },
    },
};
