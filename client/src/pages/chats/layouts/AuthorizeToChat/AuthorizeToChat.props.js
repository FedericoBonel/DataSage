import propTypes from "prop-types";

export default {
    /** True if the user needs to be an owner to access the subroutes of this page layout. FALSEY if users with any role can access it. */
    needsOwner: propTypes.bool,
    /** 
     * Array with all permissions required to access the subroutes of this page layout. 
     * ALL must by met, if any are not, then user won't be granted access 
     * UNLESS the needsOwner prop is set to true, if so, no permissions will be checked. 
     */
    requiredPermissions: propTypes.arrayOf(propTypes.string),
};
