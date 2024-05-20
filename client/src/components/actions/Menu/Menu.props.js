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
    /** The position of the pop menu corresponding to its button. Defaults to {vertical: "bottom", horizontal: "left"} positioning the menu under the button to its left limit. */
    position: PropTypes.shape({
        /** The position relative to the buttons vertical limits (top, center, bottom) */
        vertical: PropTypes.string,
        /** The position relative to the buttons horizontal limits (left, center, right) */
        horizontal: PropTypes.string,
    }),
    /** If true it keeps the menu mounted, this is useful for SEO but for react query as well. If you are making a query, to avoid getting its state reseted you could use this (to show consistent loaders, etc.). */
    keepMounted: PropTypes.bool,
};
