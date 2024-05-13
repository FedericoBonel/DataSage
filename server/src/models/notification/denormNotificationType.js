import { Schema, Types } from "mongoose";
import { messages } from "../../utils/constants/index.js";

const denormNotificationTypeSchema = new Schema({
    _id: {
        type: Types.ObjectId,
        required: [true, messages.errors.validation.INVALID_ID],
    },
    name: {
        type: String,
        required: [true, messages.errors.validation.notificationType.name.INVALID],
    },
});

export { denormNotificationTypeSchema };
