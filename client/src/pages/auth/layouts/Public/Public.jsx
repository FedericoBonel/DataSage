import AuthorizeUser from "@/features/auth/layouts/AuthorizeUser";
import { routes } from "@/utils/constants";

/**
 * Layout that verifies that a user is NOT logged in and redirects them to the main private route if they are logged in.
 * This is useful to close down public routes (that require non authenticated users) so that you can avoid the user hitting an error page.
 *
 * NOTE: This component should be used at the router level to protect pages against logged in users.
 * If you need to access the user information from a feature, you should use the service get profile/get user hook since it will contain the required cache.
 *
 * @example
 * // A public route that only allows access if the user is NOT logged in
 * router = {
 *   element: <Public />,
 *   children: [{index: true, element: <Page />, children: [<SubPage />]}],
 * }
 */
const Public = () => {
    return (
        <AuthorizeUser requiresUser={false} onFailedRedirectTo={routes.HOME} />
    );
};

export default Public;
