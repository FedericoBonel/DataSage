import { Schema, Types, model } from "mongoose";
import { messages } from "../../utils/constants/index.js";
import { notificationUserSchema } from "./notificationUser.js";
import { denormNotificationTypeSchema } from "./denormNotificationType.js";
import { denormRelatedEntityTypeSchema } from "./denormRelatedEntityType.js";

const MODEL_NAME = "Notification";

const notificationSchema = new Schema(
    {
        from: {
            type: notificationUserSchema,
            required: [true, messages.errors.validation.notification.from.INVALID],
        },
        to: {
            type: notificationUserSchema,
            required: [true, messages.errors.validation.notification.to.INVALID],
        },
        type: {
            type: denormNotificationTypeSchema,
            required: [true, messages.errors.validation.notification.type.INVALID],
        },
        relatedEntityId: {
            type: Types.ObjectId,
            required: [true, messages.errors.validation.notification.relatedEntityId.INVALID],
        },
        relatedEntityType: {
            type: denormRelatedEntityTypeSchema,
            required: [true, messages.errors.validation.notification.relatedEntityType.INVALID],
        },
        isRead: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const notification = model(MODEL_NAME, notificationSchema);

export { notification, MODEL_NAME };
