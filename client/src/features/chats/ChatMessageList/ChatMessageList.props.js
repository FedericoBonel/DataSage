import PropTypes from "prop-types";

export default {
    /** Id of the chat from which to get the messages. */
    chatId: PropTypes.string.isRequired,
    /** True if the AI is generating a response, false otherwise. */
    isResponding: PropTypes.bool
};
