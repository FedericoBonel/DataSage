import propTypes from "prop-types";

export default {
    /** Values to manage the email field */
    emailField: propTypes.shape({
        /** Function to be executed when the email field changes. Receives the onChange event of the field. */
        onChange: propTypes.func,
        /** Value to be assigned to the email field */
        value: propTypes.string,
    }),
    /** Values to manage the password field */
    passwordField: propTypes.shape({
        /** Function to be executed when the password field changes. Receives the onChange event of the field. */
        onChange: propTypes.func,
        /** Value to be assigned to the password field */
        value: propTypes.string,
    }),
    /** True if the form is being submitted, false otherwise. If true it disables the fields. */
    isSubmitting: propTypes.bool,
};
