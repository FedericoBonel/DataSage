import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from "react-router-dom";
import {
    ErrorRouter,
    NotFoundRouter,
    ChatsRouter,
    NotificationsRouter,
} from "@/routers";
import { Public, Private } from "@/routers/layouts";
import { ErrorHandler } from "@/routers/utils";
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
                children: [{ path: routes.auth.LOGIN, element: <p>Login</p> }],
            },
            /** Private routes */
            {
                element: <Private />,
                children: [ChatsRouter, NotificationsRouter],
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
