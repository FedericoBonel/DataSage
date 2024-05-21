import propTypes from "prop-types";

export default {
    /** Values to manage the email field */
    emailField: propTypes.shape({
        /** Function to be executed when the email field changes. Receives the onChange event of the field. */
        onChange: propTypes.func,
        /** Value to be assigned to the email field */
        value: propTypes.string,
    }),
    /** Values to manage the current password field. Should be used when the user already exists and the prop askForCurrentPassword is true */
    currentPasswordField: propTypes.shape({
        /** Function to be executed when the password and field changes. Receives the onChange event of the field. */
        onChange: propTypes.func,
        /** Value to be assigned to the password field */
        value: propTypes.string,
    }),
    /** Values to manage the new password field */
    newPasswordField: propTypes.shape({
        /** Function to be executed when the newPassword field changes. Receives the onChange event of the field. */
        onChange: propTypes.func,
        /** Value to be assigned to the newPassword field */
        value: propTypes.string,
    }),
    /** Values to manage the confirm password field */
    confirmPasswordField: propTypes.shape({
        /** Function to be executed when the confirmPassword fields changes. Receives the onChange event of the field. */
        onChange: propTypes.func,
        /** Value to be assigned to the confirmPassword field */
        value: propTypes.string,
    }),
    /** True if the form is being submitted, false otherwise. If true it disables the fields. */
    isSubmitting: propTypes.bool,
    /** If true the current password field will be shown, if false it wont. Useful to re use this component in registration forms. */
    askForCurrentPassword: propTypes.bool,
};
