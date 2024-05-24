import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from "react-router-dom";
import {
    ErrorRouter,
    AccountRouter,
    AuthRouter,
    NotFoundRouter,
    ChatsRouter,
    NotificationsRouter,
} from "@/routers";
import { ErrorHandler } from "@/routers/utils";
import Public from "@/pages/auth/layouts/Public";
import Private from "@/pages/auth/layouts/Private";
import { routes } from "@/utils/constants";

/** Application provider, it routes all client side requests to diferent pages. */
const router = createBrowserRouter([
    {
        errorElement: <ErrorHandler />,
        children: [
            /** Route the root path to the home path */
            {
                path: "/",
                element: <Navigate replace to={routes.HOME} />,
            },
            /** Public routes */
            {
                element: <Public />,
                children: [AuthRouter],
            },
            /** Private routes */
            {
                element: <Private />,
                children: [AccountRouter, ChatsRouter, NotificationsRouter],
            },
            /** Common routes */
            { path: routes.error.ERROR, children: [ErrorRouter] },
            /** Not found routes handling */
            NotFoundRouter,
        ],
    },
]);

const App = () => <RouterProvider router={router} />;

export default App;
