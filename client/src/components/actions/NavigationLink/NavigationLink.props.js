import PropTypes from "prop-types";

export default {
    /** If the link should have selected styles (highlighted with its color) */
    selected: PropTypes.bool,
    /** The icon to show in the link */
    icon: PropTypes.node.isRequired,
    /** The label to be shown in the link */
    label: PropTypes.string.isRequired,
    /** The href to navigate when clicked on the item. If not provided the item becomes a button. */
    href: PropTypes.string,
    /** Color to be applied to the navigation link button. If none is provided, primary will be selected. */
    color: PropTypes.string,
    /** Content to be displayed in a badge in the navigation link. If none is provided then it wont be shown. */
    badgeContent: PropTypes.node,
    /** Function to be executed when the link button is clicked if the prop href is not provided. */
    onClick: PropTypes.func,
};
