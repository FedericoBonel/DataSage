import { Outlet, Navigate } from "react-router-dom";
import ShowLoader from "@/components/informational/ShowLoader";
import accountsServices from "@/services/accounts";
import propTypes from "./AuthorizeUser.props";

/**
 *
 * Layout that verifies if a user is logged in or not and redirects them according to props.
 * This is useful to close down private or public routes (that require or not authentication) so that you can avoid the user hitting an error page.
 *
 * This component should be used to authorize users into pages and SHOULD BE USED by its page layout wrapper to follow architecture rules. DO NOT USE THIS COMPONENT DIRECTLY IN THE ROUTERS.
 *
 * If the "requiresUser" prop is true then the component will validate that the user is logged in with a valid token. If its false then it will validate that the user is NOT logged in.
 * Whenever the check for the requiresUser fails or succedes the user will be redirected to the "onFailedRedirectTo" prop.
 *
 * This component provides a context with the structure {user: {...userDataFromServer}} to the first level of nesting in the routes.
 *
 * @example
 * //User being granted access only if they are logged in, if not they get redirected to "/login"
 * return <AuthorizeUser requiresUser onFailedRedirectTo="/login">
 *
 * @example
 * //User being granted access only if they are NOT logged in, if they are logged in they get redirected to "/dashboard"
 * return <AuthorizeUser requiresUser={false} onFailedRedirectTo="/dashboard">
 */
const AuthorizeUser = ({ requiresUser, onFailedRedirectTo }) => {
    const accountQuery = accountsServices.useAccountData();

    const hasAccess = requiresUser
        ? accountQuery.isSuccess
        : accountQuery.isError;

    return (
        <ShowLoader isLoading={accountQuery.isLoading}>
            {hasAccess ? (
                <Outlet
                    context={{
                        user: accountQuery?.data?.data,
                    }}
                />
            ) : (
                <Navigate to={onFailedRedirectTo} />
            )}
        </ShowLoader>
    );
};

AuthorizeUser.propTypes = propTypes;

export default AuthorizeUser;
