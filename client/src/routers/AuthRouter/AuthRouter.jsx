import { Navigate } from "react-router-dom";
import { lazy } from "react";
import Suspense from "@/routers/components/Suspense";
const Login = lazy(() => import("@/pages/auth/Login"));
import { routes } from "@/utils/constants";

/** Router that routes all requests associated with authorization and authentication functionalities */
const AuthRouter = {
    path: routes.auth.AUTH,
    children: [
        /** Route the root path to the home login page */
        {
            path: "",
            element: <Navigate replace to={routes.auth.LOGIN} />,
        },
        /** Login Page */
        {
            path: routes.auth.LOGIN,
            element: (
                <Suspense>
                    <Login />
                </Suspense>
            ),
        },
    ],
};

export default AuthRouter;
