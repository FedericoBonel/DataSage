/** Imports and exports all constants in an encapsulated manner */
import infoMessages from "./messages/info.js";
import errorMessages from "./messages/errors.js";
import openapiMessages from "./messages/openapi.js";
import swaggeruiRoutes from "./routes/swaggerui.js";
import chatsRoutes from "./routes/chats.js";
import notificationsRoutes from "./routes/notifications.js";
import docsRoutes from "./routes/documents.js";
import messagesRoutes from "./routes/messages.js";
import participantsRoutes from "./routes/participants.js";
import participationRoutes from "./routes/participation.js";
import chatValidation from "./validation/chat.js";
import userValidation from "./validation/user.js";
import documentValidation from "./validation/document.js";
import pageValidation from "./validation/page.js";
import colaboratorValidation from "./validation/colaborator.js";
import permissionsValidation from "./validation/permissions.js";
import paginationValidation from "./validation/pagination.js";
import textSearchValidation from "./validation/textSearch.js";
import messagesValidation from "./validation/messages.js";
import colaboratorPermissions from "./permissions/colaborator.js";
import notificationTypes from "./notifications/notificationTypes.js";
import notificationRelatedEntities from "./notifications/relatedEntities.js";

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
    chats: chatsRoutes,
    notifications: notificationsRoutes,
    documents: docsRoutes,
    messages: messagesRoutes,
    participants: participantsRoutes,
    participation: participationRoutes,
});

/** Object with all the validation values used in the application for each entity. */
export const validation = Object.freeze({
    chat: chatValidation,
    user: userValidation,
    document: documentValidation,
    page: pageValidation,
    colaborator: colaboratorValidation,
    permissions: permissionsValidation,
    pagination: paginationValidation,
    textSearch: textSearchValidation,
    messages: messagesValidation,
});

/** Exports all application permissions (These should be stored in database as well) */
export const permissions = Object.freeze({
    colaborator: colaboratorPermissions,
});

/** Exports all application notification types and related entities (These should be stored in database as well) */
export const notifications = Object.freeze({
    types: notificationTypes,
    relatedEntities: notificationRelatedEntities,
});
