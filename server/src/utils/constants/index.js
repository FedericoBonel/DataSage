/** Imports and exports all constants in an encapsulated manner */
import infoMessages from "./messages/info.js";
import errorMessages from "./messages/errors.js";
import openapiMessages from "./messages/openapi.js";
import swaggeruiRoutes from "./routes/swaggerui.js";
import authRoutes from "./routes/auth.js";
import profilesRoutes from "./routes/profiles.js";
import chatsRoutes from "./routes/chats.js";
import notificationsRoutes from "./routes/notifications.js";
import docsRoutes from "./routes/documents.js";
import messagesRoutes from "./routes/messages.js";
import participantsRoutes from "./routes/participants.js";
import participationRoutes from "./routes/participation.js";
import authValidation from "./validation/auth.js";
import chatValidation from "./validation/chat.js";
import userValidation from "./validation/user.js";
import documentValidation from "./validation/document.js";
import pageValidation from "./validation/page.js";
import colaboratorValidation from "./validation/colaborator.js";
import permissionsValidation from "./validation/permissions.js";
import paginationValidation from "./validation/pagination.js";
import textSearchValidation from "./validation/textSearch.js";
import messagesValidation from "./validation/messages.js";
import logsValidation from "./validation/logs.js";
import colaboratorPermissions from "./permissions/colaborator.js";
import notificationTypes from "./notifications/notificationTypes.js";
import notificationRelatedEntities from "./notifications/relatedEntities.js";
import loggingFormatting from "./logging/formatting.js";
import loggingPrivateKeys from "./logging/privateBodyKeys.js";
import createUserVerification from "./emails/createUserVerification.js";
import createUserRecoveryAccount from "./emails/createUserRecoveryAccount.js";

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
    auth: authRoutes,
    profiles: profilesRoutes,
    chats: chatsRoutes,
    notifications: notificationsRoutes,
    documents: docsRoutes,
    messages: messagesRoutes,
    participants: participantsRoutes,
    participation: participationRoutes,
});

/** Object with all the validation values used in the application for each entity. */
export const validation = Object.freeze({
    auth: authValidation,
    chat: chatValidation,
    user: userValidation,
    document: documentValidation,
    page: pageValidation,
    colaborator: colaboratorValidation,
    permissions: permissionsValidation,
    pagination: paginationValidation,
    textSearch: textSearchValidation,
    messages: messagesValidation,
    logs: logsValidation,
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

/** Exports all constants related to logging. */
export const logging = Object.freeze({
    /** Contains all constants related to logging formatting */
    formatting: loggingFormatting,
    /** Containts all body keys that are private and should be redacted from logs */
    privateKeys: loggingPrivateKeys,
    /** Placeholder for redacted values */
    REDACTED_VALUE: "*****",
});

/** Exports all constants related to emails */
export const email = Object.freeze({
    /**
     * The function that creates and formats the contents for a user verification email
     * @param {String} receiverEmail The email of the receiver
     * @param {String} receiverNames The first and middle names of the receiver
     * @param {String} verificationCode The verification code to be sent to the receiver
     * @param {String} verifiationLink The verification link to be sent to the receiver with the verification code
     */
    createUserVerification,
    /**
     * The function that creates and formats the contents for a user recovery account email
     * @param {String} receiverEmail The email of the receiver
     * @param {String} receiverNames The first and middle names of the receiver
     * @param {String} verificationCode The recovery code to be sent to the receiver
     * @param {String} verifiationLink The recovery link to be sent to the receiver with the recovery code
     */
    createUserRecoveryAccount,
});
