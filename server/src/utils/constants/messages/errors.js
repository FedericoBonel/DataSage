import chatValidaton from "./validation/chat.js";
import userValidation from "./validation/user.js";
import docValidation from "./validation/document.js";
import pageValidation from "./validation/page.js";
import collabValidation from "./validation/colaborator.js";
import participantValidation from "./validation/participant.js";
import participationValidation from "./validation/participation.js";
import relEntityTypeValidation from "./validation/relatedEntityType.js";
import notificationValidation from "./validation/notification.js";
import notificationTypeValidation from "./validation/notificationType.js";
import permissionsValidation from "./validation/permissions.js";
import paginationValidation from "./validation/pagination.js";
import textSearchValidation from "./validation/textSearch.js";
import messageValidation from "./validation/messages.js";
import loggingValidation from "./validation/logging.js";

/** Contains all error messages to be sent to the user. */
export default Object.freeze({
    /** Error message to return when an unexpected internal error happened. */
    INTERNAL_SERVER_ERROR:
        "An internal server error ocurred, please try again. If this problem persists, contact an administrator.",
    /** Error message to return when a request did not find any handlers or middleware. */
    ROUTE_NOT_FOUND: "The requested resource was not found.",
    /** Constructs an error that happened during server initialization */
    createServerInitializationError: (error) => `An error happened during server initialization: ${error}`,
    /** Errors related to input validation */
    validation: {
        chat: chatValidaton,
        user: userValidation,
        document: docValidation,
        page: pageValidation,
        colaborator: collabValidation,
        participant: participantValidation,
        participation: participationValidation,
        relatedEntityType: relEntityTypeValidation,
        notification: notificationValidation,
        notificationType: notificationTypeValidation,
        permissions: permissionsValidation,
        pagination: paginationValidation,
        textSearch: textSearchValidation,
        message: messageValidation,
        logging: loggingValidation,
        BODY_VALIDATION_FAILED:
            "The request payload failed validation. Check the fields you are providing and try again.",
        ID_PROVIDED:
            "You have provided an '_id' field for a resource that does not accepts id fields. Please remove it and try again.",
        INVALID_ID: "You have provided an invalid id.",
    },
    /** Errors related to authentication */
    auth: {
        /** Error to be shown when a request is providing invalid email or password */
        INVALID_CREDENTIALS: "Sorry, your password or email was incorrect. Please double-check your password and email and try again.",
        /** Error to be shown when an authentication request is requesting login for a non verified user */
        NON_VERIFIED: "Sorry, it seems your account is not verified, please check your email and follow the verification steps and try again.",
        /** Error to be shown when a request had an invalid token attached to it. */
        INVALID_TOKEN: "The token provided is invalid. Please authenticate and try again.",
        /** Error to be shown when a request did not have a refresh token attached to it. */
        NO_REFRESH_TOKEN: "No refresh token was provided, you don't need to be logged out.",
        /** Error to be shown when the user does not have the permissions to take an action */
        FORBIDDEN: "You do not have the permissions to take this action.",
    },
    /** Message to show when a request wasn't processed successfully */
    REQUEST_FAILURE: "Failure request",
});
