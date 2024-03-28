import openapiRouter from "./openapi/index.js";
import { routes } from "../utils/constants/index.js";

/**
 * Configures and sets up all routes in the server
 * @param {*} app App returned by Express
 */
const configRoutes = (app) => {
    app.use(`/${routes.swaggerUi.DOCS_PAGE}`, openapiRouter);
};

export default configRoutes;
