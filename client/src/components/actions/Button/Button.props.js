import PropTypes from "prop-types";

export const propTypes = {
    /** Elements to be shown in the button */
    children: PropTypes.node,
    /** If true the button disables it self and shows a spinner. */
    isLoading: PropTypes.bool,
    /** Optional, if true the button will be an element of type "anchor" */
    isLink: PropTypes.bool,
    /** If is link is true, then this references to the url where the anchor points to. */
    href: PropTypes.string,
    /** Optional, if provided, the button will be disabled. Whenever the isLoading flag is active the button will be disabled even if disabled is false. */
    disabled: PropTypes.bool,
};