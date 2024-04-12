import authenticateUser from "../middleware/auth/authenticateUser.js";
import openapiRouter from "./openapi/index.js";
import chatsRouter from "./chats.js";
import { routes } from "../utils/constants/index.js";
import config from "../config/index.js";

/**
 * Configures and sets up all routes in the server
 * @param {*} app App returned by Express
 */
const configRoutes = (app) => {
    app.use(`/${routes.swaggerUi.DOCS_PAGE}`, openapiRouter);
    app.use(`${config.server.urls.api}/${routes.chats.CHATS}`, authenticateUser, chatsRouter);
};

export default configRoutes;
