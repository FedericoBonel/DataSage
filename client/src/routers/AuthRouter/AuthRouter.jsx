import { Navigate } from "react-router-dom";
import { lazy } from "react";
import Suspense from "@/routers/components/Suspense";
const Login = lazy(() => import("@/pages/auth/Login"));
const SignUp = lazy(() => import("@/pages/auth/SignUp"));
const Verification = lazy(() => import("@/pages/auth/Verification"));
const VerificationSent = lazy(() => import("@/pages/auth/VerificationSent"));
const RecoverAccount = lazy(() => import("@/pages/auth/RecoverAccount"));
const RecoveryEmailSent = lazy(() => import("@/pages/auth/RecoveryEmailSent"));
const ResetPassword = lazy(() => import("@/pages/auth/ResetPassword"));
const ResetPasswordDone = lazy(() => import("@/pages/auth/ResetPasswordDone"));
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
        /** Sign up Pages */
        {
            path: routes.auth.SIGNUP,
            children: [
                /** Sign Up Page */
                {
                    index: true,
                    element: (
                        <Suspense>
                            <SignUp />
                        </Suspense>
                    ),
                },
                /** Sign Up confirmation Page */
                {
                    path: routes.auth.SENT,
                    element: (
                        <Suspense>
                            <VerificationSent />
                        </Suspense>
                    ),
                },
            ],
        },
        /** Account Verification Page */
        {
            path: routes.auth.VERIFY,
            element: (
                <Suspense>
                    <Verification />
                </Suspense>
            ),
        },
        /** Account Recovery Pages */
        {
            path: routes.auth.RECOVER,
            children: [
                /** Account Recovery Page */
                {
                    index: true,
                    element: (
                        <Suspense>
                            <RecoverAccount />
                        </Suspense>
                    ),
                },
                /** Account Recovery Confirmation Page */
                {
                    path: routes.auth.SENT,
                    element: (
                        <Suspense>
                            <RecoveryEmailSent />
                        </Suspense>
                    ),
                },
                /** Account Recovery Reset Password Page */
                {
                    path: routes.auth.RESET,
                    children: [
                        {
                            index: true,
                            element: (
                                <Suspense>
                                    <ResetPassword />
                                </Suspense>
                            ),
                        },
                        {
                            path: routes.auth.DONE,
                            element: (
                                <Suspense>
                                    <ResetPasswordDone />
                                </Suspense>
                            ),
                        },
                    ],
                },
            ],
        },
    ],
};

export default AuthRouter;
