import propTypes from "prop-types";

export default {
    emailField: propTypes.shape({
        /** Function be executed when the email field changes. Receives the onChange event of the field. */
        onChange: propTypes.func,
        /** Value to be assigned to the email field */
        value: propTypes.string,
    }),
};
