import { Schema, Types as mongooseTypes } from "mongoose";
import { validation, messages } from "../../utils/constants/index.js";

const colaboratorPermissionsSchema = new Schema({
    _id: {
        type: mongooseTypes.ObjectId,
        required: [true, messages.errors.validation.colaborator.permissions.INVALID_ID],
    },
    allowedAction: {
        type: String,
        minlength: validation.permissions.allowedActions.MIN_LENGTH,
        maxlength: validation.permissions.allowedActions.MAX_LENGTH,
        required: [true, messages.errors.validation.permissions.allowedAction.INVALID_LENGTH],
    },
});

export { colaboratorPermissionsSchema };
