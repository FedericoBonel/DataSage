import { Navigate } from "react-router-dom";

import { routes } from "@/utils/constants";

/** Router that routes all not found routes to the corresponding error page. */
const NotFoundHandler = {
    path: "*",
    element: <Navigate to={`${routes.ERROR}/404`} />,
};

export default NotFoundHandler;