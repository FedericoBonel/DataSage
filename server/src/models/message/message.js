import { Schema, Types, model } from "mongoose";
import { MODEL_NAME as COLAB_MODEL_NAME } from "../colaborator/colaborator.js";
import { messagesPagesSchema } from "./messagePages.js";
import { validation, messages } from "../../utils/constants/index.js";

const MODEL_NAME = "Message";

const messageSchema = new Schema(
    {
        colaborator: {
            type: Types.ObjectId,
            ref: COLAB_MODEL_NAME,
            required: [true, messages.errors.validation.message.INVALID_COLLABORATOR],
        },
        from: {
            type: String,
            validate: {
                validator: (from) => Object.values(validation.messages.actors).includes(from),
                message: messages.errors.validation.message.INVALID_ACTOR,
            },
            required: [true, messages.errors.validation.message.INVALID_ACTOR],
        },
        to: {
            type: String,
            validate: {
                validator: (to) => Object.values(validation.messages.actors).includes(to),
                message: messages.errors.validation.message.INVALID_ACTOR,
            },
            required: [true, messages.errors.validation.message.INVALID_ACTOR],
        },
        content: {
            type: String,
            minlength: validation.messages.MIN_LENGTH,
            maxlength: validation.messages.MAX_LENGTH_DB,
            required: [true, messages.errors.validation.message.INVALID_LENGTH_DB],
        },
        sources: {
            type: [messagesPagesSchema],
            validate: {
                validator: (pages) =>
                    (pages?.length && pages.length <= validation.messages.sources.LIMIT) || !pages?.length,
                message: messages.errors.validation.message.TOO_MANY_SOURCES,
            },
        },
        createdAt: {
            type: Date,
            // eslint-disable-next-line
            default: function () {
                // Add some miliseconds to AI to show the messages correctly when listing them by date
                return this.from === validation.messages.actors.AI ? new Date(Date.now() + 5) : new Date();
            },
        },
    },
    { timestamps: { createdAt: false, updatedAt: true } }
);

const message = model(MODEL_NAME, messageSchema);

export { message, MODEL_NAME };
