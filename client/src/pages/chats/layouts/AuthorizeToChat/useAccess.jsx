import { useOutletContext } from "react-router-dom";

/**
 * @callback VerifyPermissions Utility function to verify permissions
 * @param {Array.<string>} permissions The list of required permissions. All permissions must be met.
 * @returns {boolean} True if the user has access to those permissions, false otherwise.
 */

/**
 * @typedef {Object} AccessContext Context object provided from the AuthorizeToChat layout.
 * @property {boolean} isOwner Whether or not the current user owns this chat
 * @property {[{_id: string, allowedAction: string}]} permissions  List of permission objects for the current user on this chat.
 * @property {VerifyPermissions} verifyPermissions Utility function to verify permissions
 */

/**
 * Provides access to the context provided by the AuthorizeToChat layout component.
 * Hence, this should be used underneath the AuthorizeToChat layout component AND ONLY IN PAGES components.
 * @returns {AccessContext} The access context provided by the verify chat permissions
 */
const useAccess = () => {
    const context = useOutletContext();
    if (
        !context.permissions ||
        context.isOwner === null ||
        context.isOwner === undefined ||
        !context.verifyPermissions
    ) {
        throw Error(
            "The useAccess hook should be used at the very first nesting routes level after the AuthorizeToChat layout!"
        );
    }

    return context;
};

export default useAccess;
