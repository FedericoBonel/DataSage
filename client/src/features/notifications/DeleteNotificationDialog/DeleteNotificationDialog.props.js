import propTypes from "prop-types";

export default {
    /** Id of the notification to be deleted */
    notificationId: propTypes.string,
    /** Type of the notification to be deleted. This should in sync with back end and it allows for showing relevant messages in the dialog. */
    notificationType: propTypes.string,
    /** True if the delete dialog should be open. False otherwise. */
    isOpen: propTypes.bool,
    /** The function to be executed when the dialog closes down. It should handle the isOpen state. */
    onClose: propTypes.func.isRequired,
};
