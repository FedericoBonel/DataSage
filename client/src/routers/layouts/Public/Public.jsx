import { Outlet, Navigate } from "react-router-dom";

import { useToken } from "@/contexts/auth";
import { routes } from "@/utils/constants";

/**
 * Checks if the user is logged out and if it is it allows access to whatever
 * routes are nested on the route where this component is used.
 * Otherwise it redirects them to the home page.
 */
const Private = () => {
    const isLoggedIn = useToken();

    return isLoggedIn ? <Navigate to={routes.HOME} /> : <Outlet />;
};

export default Private;
