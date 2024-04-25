import { Schema, model } from "mongoose";
import { messages } from "../../utils/constants/index.js";

const MODEL_NAME = "NotificationType";
const COLLECTION_NAME = "notificationTypes";

const notificationTypeSchema = new Schema({
    name: {
        type: String,
        required: [true, messages.errors.validation.notificationType.name.INVALID],
    },
});

const notificationType = model(MODEL_NAME, notificationTypeSchema, COLLECTION_NAME);

export { notificationType, MODEL_NAME };
