import AuthorizeUser from "@/features/auth/layouts/AuthorizeUser";
import { routes } from "@/utils/constants";

/**
 * Layout that verifies if a user is logged in or not and redirects them to the main public route if not logged in.
 * This is useful to close down private routes (that require authentication) so that you can avoid the user hitting an error page.
 *
 * NOTE: This component should be used at the router level to protect pages and provide user context (user information) to page components.
 * If you need to access the user information from a feature, you should use the service get profile/get user hook since it will contain the required cache.
 *
 * @example
 * // A private route that only allows access if the user is logged in and provides the user context to the <Page /> component but not the <SubPage /> component
 * router = {
 *   element: <Private />,
 *   children: [{index: true, element: <Page />, children: [<SubPage />]}],
 * }
 */
const Private = () => {
    return (
        <AuthorizeUser requiresUser onFailedRedirectTo={routes.auth.LOGIN} />
    );
};

export default Private;
