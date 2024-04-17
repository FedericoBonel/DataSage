import PropTypes from "prop-types";

export default {
    /** The content of the menu */
    children: PropTypes.node,
    /** The label to be shown or used in the button */
    label: PropTypes.string.isRequired,
    /** The variant of the button to be shown */
    variant: PropTypes.oneOf(["iconButton", "button"]),
    /** The icon to be shown in the icon button if variant is icon button */
    icon: PropTypes.node,
    /** If true label will be shown, false it wont be showed. Only used with variant icon button. */
    showLabel: PropTypes.bool,
};
