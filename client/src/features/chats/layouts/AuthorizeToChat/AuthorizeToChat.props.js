import propTypes from "prop-types";

export default {
    /** Id of the chat where the user should be authorized into */
    chatId: propTypes.string,
    /** True if the user needs to be an owner to access the subroutes of this page layout. FALSEY if users with any role can access it. */
    needsOwner: propTypes.bool,
    /** 
     * Array with all permissions required to access the subroutes of this page layout. 
     * ALL must by met, if any are not, then user won't be granted access 
     * UNLESS the needsOwner prop is set to true, if so, no permissions will be checked
     * and only chat ownership will. 
     */
    requiredPermissions: propTypes.array,
};
