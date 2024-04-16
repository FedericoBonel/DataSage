import { Outlet, Navigate } from "react-router-dom";

import { useToken } from "@/contexts/auth";
import { routes } from "@/utils/constants";

/**
 * Checks if the user is logged in and if it is logeed in it allows access to whatever
 * routes are nested in the route where this components is rendered.
 * Otherwise it redirects them to the login page.
 */
const Private = () => {
    const isLoggedIn = useToken();

    return isLoggedIn ? <Outlet /> : <Navigate to={routes.LOGIN} />;
};

export default Private;
