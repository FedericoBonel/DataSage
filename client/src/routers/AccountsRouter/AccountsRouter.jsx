import { lazy } from "react";
import Suspense from "@/routers/components/Suspense";
import NavbarLayout from "@/pages/layouts/NavbarLayout";
const AccountSettings = lazy(() => import("@/pages/accounts/AccountSettings"));
import { routes } from "@/utils/constants";

/** Router that routes all requests associated with account management functionalities */
const AuthRouter = {
    path: routes.accounts.ACCOUNT,
    element: <NavbarLayout />,
    children: [
        /** Account settings page */
        {
            path: routes.SETTINGS,
            element: (
                <Suspense>
                    <AccountSettings />
                </Suspense>
            ),
        },
    ],
};

export default AuthRouter;
