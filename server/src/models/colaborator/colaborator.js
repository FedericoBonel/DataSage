import { Schema, model } from "mongoose";
import { colaboratorChatSchema } from "./colaboratorChat.js";
import { colaboratorUserSchema } from "./colaboratorUser.js";
import { colaboratorPermissionsSchema } from "./colaboratorPermissions.js";
import { validation, messages } from "../../utils/constants/index.js";

const MODEL_NAME = "Colaborator";

const colaboratorSchema = new Schema(
    {
        user: {
            type: colaboratorUserSchema,
            required: [true, messages.errors.validation.colaborator.user.MISSING],
        },
        chat: {
            type: colaboratorChatSchema,
            required: [true, messages.errors.validation.colaborator.chat.MISSING],
        },
        permissions: {
            type: [colaboratorPermissionsSchema],
            validate: {
                validator: (permissions) =>
                    (permissions?.length && permissions?.length <= validation.colaborator.permissions.MAX_AMOUNT) ||
                    !permissions?.length,
                message: messages.errors.validation.colaborator.permissions.INVALID_AMOUNT,
            },
        },
        hasJoined: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const colaborator = model(MODEL_NAME, colaboratorSchema);

export { colaborator, MODEL_NAME };
