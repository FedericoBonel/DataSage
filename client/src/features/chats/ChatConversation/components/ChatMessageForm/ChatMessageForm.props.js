import propTypes from "prop-types";

export default {
    /** Callback to be executed when the user wants to send the message. It receives the value to be sent. */
    onSend: propTypes.func,
    /** True if the field should be disabled, false otherwise. */
    disabled: propTypes.bool
}