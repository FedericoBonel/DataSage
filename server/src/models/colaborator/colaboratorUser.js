import { Schema, Types as mongooseTypes } from "mongoose";
import { validation, messages } from "../../utils/constants/index.js";

const colaboratorUserSchema = new Schema(
    {
        _id: {
            type: mongooseTypes.ObjectId,
            required: [true, messages.errors.validation.colaborator.user.INVALID_ID],
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
    },
);

export { colaboratorUserSchema };
