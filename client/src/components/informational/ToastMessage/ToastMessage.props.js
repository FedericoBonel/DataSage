import { BadRequestError } from "@/dtos/errors";
import PropTypes from "prop-types";

export default {
    autoClose: PropTypes.bool,
    /** True if you want to display a spinner in the snackbar while it's open. */
    isLoading: PropTypes.bool,
    /** True if you want to highlight the message by displaying it at the top of the screen. */
    isImportant: PropTypes.bool,
    /** Type of message to display, depending on the type, an icon will be shown or not. */
    severity: PropTypes.oneOf(["success", "error", "alert", "info"]),
    /** Error as it was received from the back end after upload failed. Only used if severity is error. */
    error: PropTypes.shape(BadRequestError),
    /** Message to be shown in the toast. If error is provided then this message is ignored and the errorMsg is used instead. */
    message: PropTypes.string,
};
