import authServices from "../../../services/auth/auth.js";

/**
 * Constructs the middleware that validates that a user has the permissions needed for taking an action in a chat.
 * If the user is the owner then no permissions are going to be checked. They are given complete access.
 * 
 * NOTE: The middleware that validates a user token and user information should be before this one.
 * @param {Array.<string>} permissionsNeeded Array of permissions needed to commit the action.
 */
const chatPermissionsValidator = (permissionsNeeded) => async (req, res, next) => {
    const user = req.user;
    const { chatId } = req.params;

    await authServices.authorizeCollaboratorToChat(chatId, user._id, [permissionsNeeded]);

    next();
};

export default chatPermissionsValidator;
