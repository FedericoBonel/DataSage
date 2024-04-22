import PropTypes from "prop-types";

export default {
    /** Id of the chat from which to delete the document */
    chatId: PropTypes.string,
    /** Id of the document to delete */
    documentId: PropTypes.string,
    /** True if the dialog should be open, false otherwise */
    isOpen: PropTypes.bool,
    /** The function to be executed when closing the dialog or canceling the action */
    onClose: PropTypes.func,
};
