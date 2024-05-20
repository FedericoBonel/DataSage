import propTypes from "prop-types";

export default {
    emailField: propTypes.shape({
        /** Function to be executed when the email field changes. Receives the onChange event of the field. */
        onChange: propTypes.func,
        /** Value to be assigned to the email field */
        value: propTypes.string,
        /** The text explaining the field. If not provided is not shown. */
        helperText: propTypes.string,
        /** The validator function to be passed to the text field */
        validator: propTypes.func,
    }),
    passwordField: propTypes.shape({
        /** Function to be executed when the password and confirm password fields changes. Receives the onChange event of the field. */
        onChange: propTypes.func,
        /** Value to be assigned to the email field */
        value: propTypes.string,
        /** The text explaining the field. If not provided is not shown. */
        helperText: propTypes.string,
        /** If true the confirm password field will be hidden. Useful for login pages or similar. */
        hideConfirmPassword: propTypes.bool,
        /** The text explaining the confirm password field. If not provided is not shown. */
        confirmHelperText: propTypes.string,
        /** The validator function to be passed to the text field */
        validator: propTypes.func,
        /** The validator function to be passed to the text field for the confirm password field */
        confirmPasswordValidator: propTypes.func,
    }),
    /** True if the form is being submitted, false otherwise. If true it disables the fields. */
    isSubmitting: propTypes.bool,
};
