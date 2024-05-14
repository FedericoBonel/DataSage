import { useMatch } from "react-router-dom";
import AuthorizeToChatFeature from "@/features/chats/layouts/AuthorizeToChat";
import { routes } from "@/utils/constants";
import propTypes from "./AuthorizeToChat.props";

/** 
 * Layout that verifies if a user is a participant in a specific chat and if is its owner or has a specific set of permissions 
 * 
 * NOTE: This component should be used at the router level to protect pages and provide access context to pages (chat permissions).
 * 
 * NOTE: If the user is an owner, then no permissions are going to be checked, the user is granted full access. 
 * The needsOwner prop is only to make sure that the user being granted access is an owner for pages that require only chat owners.
 * 
 * NOTE: If the required permissions is empty and the needs owner is false or undefined then only user participation will be checked.
 * 
 * @example 
 * // User being granted access to a page if they are a chat participant (no ownership or permissions checked)
 * router = {
 *   element: <AuthorizeToChat />,
 *   children: [{index: true, element: <Page />}],
 * }
 * 
 * @example 
 * // User being granted access to a page ONLY if they are a chat owner (no permissions checked even if any provided)
 * router = {
 *   element: <AuthorizeToChat needsOwner />,
 *   children: [{index: true, element: <Page />}],
 * }
 * 
 * @example 
 * // User being granted access to a page if they have specific permissions, all permissions must be possessed
 * router = {
 *   element: <AuthorizeToChat requiredPermissions={["read_docs", "upload_docs"]} />,
 *   children: [{index: true, element: <Page />}],
 * }
 */
const AuthorizeToChat = ({ needsOwner, requiredPermissions }) => {
    // Get the chat id from url
    const match = useMatch(`/${routes.chats.CHATS}/:selectedChat/*`);
    const chatId = match?.params?.selectedChat;

    return (
        <AuthorizeToChatFeature
            chatId={chatId}
            needsOwner={needsOwner}
            requiredPermissions={requiredPermissions}
        />
    );
};

AuthorizeToChat.propTypes = propTypes;

export default AuthorizeToChat;
