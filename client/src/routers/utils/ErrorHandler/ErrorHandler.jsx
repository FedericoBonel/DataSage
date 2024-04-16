import { Navigate, useRouteError } from "react-router-dom";
import { routes } from "@/utils/constants";

/** Components that handles application errors and redirects user as necessary. */
const ErrorHandler = () => {
    // Extract the error that happened
    const error = useRouteError();

    const code = error?.response?.status || 500;

    return <Navigate to={`${routes.error.ERROR}/${code}`} />;
};

export default ErrorHandler;
