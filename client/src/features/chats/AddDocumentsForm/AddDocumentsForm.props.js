import PropTypes from "prop-types";

export default {
    /** Id of the chat to which to upload the files */
    chatId: PropTypes.string,
    /** True if the number of documents uploaded to the chat should be shown and checked, false otherwise. */
    showCount: PropTypes.bool,
};
