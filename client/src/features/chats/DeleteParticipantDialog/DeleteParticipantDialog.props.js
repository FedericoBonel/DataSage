import propTypes from "prop-types";

export default {
    /** Id of the chat from which to remove the participant */
    chatId: propTypes.string.isRequired,
    /** Id of the participant to remove from the chat */
    participantId: propTypes.string,
    /** True if the dialog should be open, false otherwise */
    isOpen: propTypes.bool.isRequired,
    /** Function to be executed when closing the dialog */
    onClose: propTypes.func.isRequired,
};
