import { Schema, Types } from "mongoose";
import { messages, validation } from "../../utils/constants/index.js";

const notificationUserSchema = new Schema({
    _id: {
        type: Types.ObjectId,
        required: [true, messages.errors.validation.INVALID_ID],
    },
    names: {
        type: String,
        minlength: validation.user.names.MIN_LENGTH,
        maxlength: validation.user.names.MAX_LENGTH,
        required: [true, messages.errors.validation.user.names.INVALID_LENGTH],
    },
    lastnames: {
        type: String,
        minlength: validation.user.lastnames.MIN_LENGTH,
        maxlength: validation.user.lastnames.MAX_LENGTH,
        required: [true, messages.errors.validation.user.lastnames.INVALID_LENGTH],
    },
});

export { notificationUserSchema };
