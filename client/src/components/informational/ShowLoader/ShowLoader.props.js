import PropTypes from "prop-types";

export const propTypes = {
    /** This should be true whenever its children are loading. */
    isLoading: PropTypes.bool,
    /** Optional, Message to be shown to the user while loading. */
    message: PropTypes.string,
    /** Optional, fallback to be shown when isLoading is true. By default a spinner is shown. */
    fallback: PropTypes.node,
    /** If true, the padding of the spinner is disabled. */
    disablePadding: PropTypes.bool,
    /** If "dialog", the spinner is shown on top of the ui with a backdrop. */
    variant: PropTypes.oneOf(["dialog", "", undefined]),
    /** Props to be passed to the fallback. Only used if no fallback prop is passed. */
    fallbackProps: PropTypes.object,
};