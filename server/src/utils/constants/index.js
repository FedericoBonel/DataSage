/** Imports and exports all constants in an encapsulated manner */
import infoMessages from "./messages/info.js";
import errorMessages from "./messages/errors.js";
import openapiMessages from "./messages/openapi.js";
import swaggeruiRoutes from "./routes/swaggerui.js";

/** Object with all messages to be shown to the user */
export const messages = Object.freeze({
    // Informational messages
    info: infoMessages,
    // General errors
    errors: errorMessages,
    // OpenAPI messages
    openapi: openapiMessages,
});

/** Object with all the routes used in the application without "/" (i.g. the route in the api "/entity" would be in routes.entity as "entity") */
export const routes = Object.freeze({
    swaggerUi: swaggeruiRoutes,
});
