import PropTypes from "prop-types";

export default {
    /** Id of the chat from which to show the document list. */
    chatId: PropTypes.string,
    /** True if the delete button should be shown in the documents list items, false otherwise */
    showDelete: PropTypes.bool,
};
