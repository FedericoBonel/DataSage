import { Schema, model } from "mongoose";
import { validation, messages } from "../../utils/constants/index.js";

const MODEL_NAME = "User";

const recoveryCodeSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
            minlength: validation.auth.recoveryCode.MIN_LENGTH,
            maxlength: validation.auth.recoveryCode.MAX_LENGTH,
            unique: true,
            sparse: true,
        },
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

const passwordSchema = new Schema(
    {
        content: {
            type: String,
            minlength: validation.user.password.MIN_LENGTH,
            maxlength: validation.user.password.MAX_LENGTH,
            required: [true, messages.errors.validation.user.password.INVALID],
        },
    },
    { timestamps: { updatedAt: true, createdAt: false } }
);

const userSchema = new Schema(
    {
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
        email: {
            type: String,
            minlength: validation.user.email.MIN_LENGTH,
            maxlength: validation.user.email.MAX_LENGTH,
            unique: true,
            required: [true, messages.errors.validation.user.email.INVALID],
        },
        password: {
            type: passwordSchema,
            required: [true, messages.errors.validation.user.password.INVALID],
        },
        isAdmin: {
            type: Boolean,
            default: false,
            required: false,
        },
        verified: {
            type: Boolean,
            default: false,
            required: false,
        },
        verificationCode: {
            type: String,
            required: false,
            minlength: validation.auth.verificationCode.MIN_LENGTH,
            maxlength: validation.auth.verificationCode.MAX_LENGTH,
            unique: true,
            sparse: true,
        },
        recoveryCode: {
            type: recoveryCodeSchema,
            required: false,
        },
    },
    { timestamps: true }
);

const user = model(MODEL_NAME, userSchema);

export { user, MODEL_NAME };
