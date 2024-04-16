import PropTypes from "prop-types";

export default {
    /** If the current navigation is in this menu or not */
    selected: PropTypes.bool,
    /** The icon to show in the link */
    icon: PropTypes.node.isRequired,
    /** The label to be shown in the link */
    label: PropTypes.string.isRequired,
    /** The href to navigate when clicked on the item. If not provided the item becomes a button. */
    href: PropTypes.string,
};
