import { Schema, model } from "mongoose";
import { chatOwnerSchema } from "./chatOwner.js";
import { documentsSchema } from "./document.js";
import { validation, messages } from "../../utils/constants/index.js";

const MODEL_NAME = "Chat";

const chatSchema = new Schema(
    {
        name: {
            type: String,
            minlength: validation.chat.name.MIN_LENGTH,
            maxlength: validation.chat.name.MAX_LENGTH,
            required: [true, messages.errors.validation.chat.name.INVALID_LENGTH],
        },
        owner: {
            type: chatOwnerSchema,
            required: [true, messages.errors.validation.chat.owner.MISSING],
        },
        documents: {
            type: [documentsSchema],
            validate: (docs) => docs?.length && docs?.length <= validation.chat.documents.MAX_AMOUNT,
            required: [true, messages.errors.validation.chat.documents.INVALID_AMOUNT],
        },
    },
    { timestamps: true }
);

const chat = model(MODEL_NAME, chatSchema);

export { chat, MODEL_NAME };
