import PropTypes from "prop-types";

export default {
    /** Received the parameters to be passed to the name field */
    nameField: PropTypes.shape({
        /** Value to be assigned to the name field */
        value: PropTypes.string,
        /** Function be executed when the name field changes. Receives the onChange event of the field. */
        onChange: PropTypes.func,
    }),
    /** True if the form is being submitted, false otherwise. If true it disables the fields */
    isSubmitting: PropTypes.bool,
};
