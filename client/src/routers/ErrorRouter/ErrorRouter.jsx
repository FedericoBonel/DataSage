import { lazy } from "react";
import Suspense from "@/routers/components/Suspense";
const ErrorPage = lazy(() => import("@/pages/errors/ErrorPage"));

/** This configuration object takes care of routing to all error pages. */
const ErrorRouter = {
    path: `:code`,
    element: (
        <Suspense>
            <ErrorPage />
        </Suspense>
    ),
};

export default ErrorRouter;
