import PropTypes from "prop-types";

export default {
    /** Component to be rendered. Must be a string of the HTML element or a React Component (Function or class) */
    component: PropTypes.elementType,
    /** Component to be rendered for containing the buttons. Must be a string of the HTML component or a React Component (Function or class) */
    buttonsWrapper: PropTypes.elementType,
    /** Labels to be assigned to submit and cancel the buttons */
    buttonsLabels: PropTypes.shape({
        submit: PropTypes.string,
        cancel: PropTypes.string,
    }),
    /** Function to be exectued on submition */
    onSubmit: PropTypes.func,
    /** True if the form is being submitted false otherwise */
    isSubmitting: PropTypes.bool,
    /** True if the form can be submitted false otherwise */
    canSubmit: PropTypes.bool,
    /** Callback to be executed when the form is canceled */
    onCancel: PropTypes.func,
};
