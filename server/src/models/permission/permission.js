import { Schema, model } from "mongoose";
import { validation, messages } from "../../utils/constants/index.js";

const MODEL_NAME = "Permissions";

const permissionsSchema = new Schema(
    {
        allowedAction: {
            type: String,
            minlength: validation.permissions.allowedActions.MIN_LENGTH,
            maxlength: validation.permissions.allowedActions.MAX_LENGTH,
            required: [true, messages.errors.validation.permissions.allowedAction.INVALID_LENGTH],
            unique: true,
        },
    },
    { timestamps: true }
);

const permission = model(MODEL_NAME, permissionsSchema);

export { permission, MODEL_NAME };
