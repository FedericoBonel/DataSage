import PropTypes from "prop-types";

export default {
    /** Value of the selected tab */
    value: PropTypes.string.isRequired,
    /** Function to be executed when a tab is clicked. it receives (event, newValue). Should be used to set the value prop. */
    onClickTab: PropTypes.func.isRequired,
};
