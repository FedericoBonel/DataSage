import { Outlet, Navigate } from "react-router-dom";
import { useCallback } from "react";
import chatsServices from "@/services/chats";
import ShowLoader from "@/components/informational/ShowLoader";
import { routes } from "@/utils/constants";
import verifyPermissions from "./verifyPermissions";
import propTypes from "./AuthorizeToChat.props";

/**
 * Layout that verifies if the logged in user has access to a specific chat or not, if is its owner or if they have a specific set of permissions.
 * If any of those conditions are not met, the user is redirected to the error 403 page.
 *
 * This component should be used to authorize users into chats and SHOULD BE USED by its page layout wrapper to follow architecture rules. DO NOT USE THIS COMPONENT DIRECTLY IN THE ROUTERS.
 *
 * NOTE: If the user is an owner, then no permissions are going to be checked, the user is granted full access.
 * The needsOwner prop is only to make sure that the user being granted access is an owner for pages that require only chat owners.
 *
 * NOTE: If the required permissions is empty and the needs owner is false or undefined then only user participation will be checked.
 */
const AuthorizeToChat = ({
    chatId,
    needsOwner = false,
    requiredPermissions = [],
}) => {
    const chatQuery = chatsServices.useChatById(chatId);

    const isOwner = chatQuery.isSuccess && chatQuery.data?.data.isOwner;
    const hasPermissions =
        chatQuery.isSuccess &&
        verifyPermissions(
            requiredPermissions,
            chatQuery.data?.data.permissions,
            isOwner
        );
    const hasJoined = chatQuery.isSuccess && chatQuery.data?.data.hasJoined;

    const hasAccess =
        hasJoined &&
        ((needsOwner && isOwner) || (!needsOwner && hasPermissions));

    const verifyPermissionsContext = useCallback(
        (requiredPermissions) =>
            verifyPermissions(
                requiredPermissions,
                chatQuery.data?.data.permissions,
                chatQuery.data?.data.isOwner
            ),
        [chatQuery.data?.data.permissions, chatQuery.data?.data.isOwner]
    );

    return (
        <ShowLoader isLoading={chatQuery.isLoading}>
            {hasAccess ? (
                <Outlet
                    context={{
                        permissions: chatQuery.data?.data.permissions,
                        isOwner: chatQuery.data?.data.isOwner,
                        verifyPermissions: verifyPermissionsContext,
                    }}
                />
            ) : (
                <Navigate to={`/${routes.ERROR}/403`} />
            )}
        </ShowLoader>
    );
};

AuthorizeToChat.propTypes = propTypes;

export default AuthorizeToChat;
