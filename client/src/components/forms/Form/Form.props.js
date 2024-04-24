import PropTypes from "prop-types";

export default {
    /** Component to be rendered. Must be a string of the HTML element or a React Component (Function or class) */
    component: PropTypes.elementType,
    /** Component to be rendered for containing the buttons. Must be a string of the HTML component or a React Component (Function or class) */
    buttonsWrapper: PropTypes.elementType,
    /** Labels to be assigned to submit and cancel the buttons */
    buttonsLabels: PropTypes.shape({
        /** Label of the submit button */
        submit: PropTypes.string.isRequired,
        /** Label of the cancel button. If not provided the cancel button will be hidden. */
        cancel: PropTypes.string,
    }),
    /** Colors to be applied to the buttons */
    buttonsColor: PropTypes.shape({
        /** Color to be applied to the submit button */
        submit: PropTypes.string.isRequired,
        /** Color to be applied to the cancel button */
        cancel: PropTypes.string,
    }),
    /** Function to be executed on submition */
    onSubmit: PropTypes.func,
    /** True if the form is being submitted false otherwise */
    isSubmitting: PropTypes.bool,
    /** True if the form can be submitted false otherwise */
    canSubmit: PropTypes.bool,
    /** Callback to be executed when the form is canceled */
    onCancel: PropTypes.func,
};
