import PropTypes from "prop-types";

export default {
    /** The props related to the first and middle names field */
    namesField: PropTypes.shape({
        /** The function to be executed when the field changes. */
        onChange: PropTypes.func,
        /** The value to be assigned to the field */
        value: PropTypes.string,
    }),
    /** The props related to the last names field */
    lastNamesField: PropTypes.shape({
        /** The function to be executed when the field changes. */
        onChange: PropTypes.func,
        /** The value to be assigned to the field */
        value: PropTypes.string,
    }),
    /** Wheter or not the form where this section is being used is being uploaded. If true it disables the fields.  */
    isSubmitting: PropTypes.bool,
};
