import { lazy } from "react";
import { NavbarLayout } from "@/pages/layouts";
import Suspense from "@/routers/components/Suspense";
const NotificationsList = lazy(() =>
    import("@/pages/notifications/NotificationsList")
);
import { routes } from "@/utils/constants";

/** Router that routes all requests associated with notifications */
const NotificationsRouter = {
    path: routes.notifications.NOTIFICATIONS,
    element: <NavbarLayout />,
    children: [
        {
            index: true,
            element: (
                <Suspense>
                    <NotificationsList />
                </Suspense>
            ),
        },
    ],
};

export default NotificationsRouter;
