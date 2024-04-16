import { ErrorPage } from "@/pages/errors/components";

/** This configuration object takes care of routing to all error pages. */
const ErrorRouter = {
    path: `:code`,
    element: <ErrorPage />,
};

export default ErrorRouter;
