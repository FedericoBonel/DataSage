import propTypes from "prop-types";

export default {
    /** "True" if the list needs to be filtered by read notifications only. "False" if it only needs to show the not read notifications. */
    value: propTypes.string,
    /** Function to be executed when a tab is clicked. it receives (event, newValue). Should be used to set the value prop. */
    onClickTab: propTypes.func,
};
