import propTypes from "prop-types";

/** Proptypes of a back end bad request error payload */
export default {
    /** Status of the request */
    success: propTypes.bool.isRequired,
    /** Main error message */
    errorMsg: propTypes.string.isRequired,
    /** Any sub errors that could have happened */
    errors: propTypes.arrayOf(
        propTypes.shape({
            msg: propTypes.string.isRequired,
            errorField: propTypes.string.isRequired,
        })
    ),
};
