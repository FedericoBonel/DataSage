import PropTypes from "prop-types";

export default {
    /** Mimetypes that should be accepted for file uploads with extensions. Each key should be the mimetype, and the value should be the accepted extensions. */
    acceptedTypes: PropTypes.object,
    /** If the file input should accept multiple files. By default is disabled. */
    multiple: PropTypes.bool,
    /** The number of files to be accepted. Only used if multiple is true. If more files are selected by user, they will be ignored. */
    maxFiles: PropTypes.number,
    /** The maximum size in bytes to be accepted per file. Any file larger will be ignored. */
    maxSize: PropTypes.number,
    /** The function to be executed when a file or files are selected. It receives the file or files if multiple is enabled. */
    onChange: PropTypes.func.isRequired,
    /** True if the field should be disabled */
    disabled: PropTypes.bool,
    /** The styles to be provided to the button element where the input is rendered */
    sx: PropTypes.object,
};
