import { Navigate, useRouteError } from "react-router-dom";
import { useEffect } from "react";
import { routes } from "@/utils/constants";
import useLogout from "@/utils/hooks/useLogout";

/** Component that handles application errors and redirects user as necessary. */
const ErrorHandler = () => {
    // Extract the error that happened
    const error = useRouteError();
    const logout = useLogout();

    const code = error?.response?.status || 500;

    const invalidCredentials = code === 401;

    useEffect(() => {
        if (invalidCredentials) {
            logout();
        }
    }, [invalidCredentials, logout]);

    return (
        <Navigate
            to={
                invalidCredentials
                    ? `/${routes.auth.AUTH}/${routes.auth.LOGIN}`
                    : `${routes.error.ERROR}/${code}`
            }
            replace={invalidCredentials}
        />
    );
};

export default ErrorHandler;
