import PropTypes from "prop-types";

export default {
    /** Content to be shown inside the dialog. Should contain a question or description about the decision. */
    children: PropTypes.node.isRequired,
    /** Content to be shown in the header of the dialog. Should contain the main question or action that the dialog is about. */
    title: PropTypes.string,
    /** True if the dialog should be open, false otherwise. */
    isOpen: PropTypes.bool,
    /** Callback to be invoked when the dialog closes or the user selects the cancel option. This should set the isOpen to false. */
    onClose: PropTypes.func.isRequired,
    /** Callback to be invoked when the user selects accept. */
    onAccept: PropTypes.func.isRequired,
    /** True if the user accepted the option and the action is being processed. This will disable the accept option and show a loader. */
    isAccepting: PropTypes.bool,
    /** Labels for the buttons. Optional. */
    buttonLabels: PropTypes.shape({
        /** Label for accept button */
        accept: PropTypes.string,
        /** Label for cancel button */
        cancel: PropTypes.string,
    }),
};
