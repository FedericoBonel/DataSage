import PropTypes from "prop-types";

export default {
    /** Params to be passed to the documents (file selection) field. */
    documentsField: PropTypes.shape({
        /** Function that gets executed when a new document is selected. It receives the documents as an array. */
        onChange: PropTypes.func.isRequired,
        /** List of selected documents */
        documents: PropTypes.arrayOf(PropTypes.instanceOf(File)).isRequired,
    }),
};
