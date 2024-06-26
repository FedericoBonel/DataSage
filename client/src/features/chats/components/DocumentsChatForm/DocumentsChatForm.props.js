import PropTypes from "prop-types";

export default {
    /** Params to be passed to the documents (file selection) field. */
    documentsField: PropTypes.shape({
        /** Function that gets executed when a new document is selected. It receives the documents as an array. */
        onChange: PropTypes.func.isRequired,
        /** List of selected documents */
        documents: PropTypes.arrayOf(PropTypes.instanceOf(File)).isRequired,
        /** True if the field should be disabled. False otherwise */
        disabled: PropTypes.bool,
    }),
    /** True if the form is being submitted, false otherwise. If true the field will be disabled. */
    isSubmitting: PropTypes.bool
};
