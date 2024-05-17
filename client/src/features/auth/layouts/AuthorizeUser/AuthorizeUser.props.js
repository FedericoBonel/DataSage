import propTypes from "prop-types";

export default {
    /** If the user should be logged in to render subroutes of this component. If true it requires the user to be logged in (valid access token) otherwise it requires that no user is logged in */
    requiresUser: propTypes.bool.isRequired,
    /** The page where the user should be redirected when the requiresUser check fails (i.g. "/login", "/dashboard"). */
    onFailedRedirectTo: propTypes.string.isRequired,
};
