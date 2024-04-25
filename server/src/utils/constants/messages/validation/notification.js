/** Contains all notification validation error messages to be used in the application. */
export default Object.freeze({
    from: {
        /** Message to be shown when the sender of a notification is not present. */
        INVALID: "You need to provide the sender of the notification.",
    },
    to: {
        /** Message to be shown when the receiver of a notification is not present. */
        INVALID: "You need to provide the receiver of the notification.",
    },
    type: {
        /** Message to be shown when the notification type is not present. */
        INVALID: "You need to provide the notification type.",
    },
    relatedEntityType: {
        /** Message to be shown when the related entity type of a notification is not present. */
        INVALID: "You need to provide the notification related entity type.",
    },
    relatedEntityId: {
        /** Message to be shown when the related entity id of a notification is not present. */
        INVALID: "You need to provide the notification related entity id.",
    },
});
