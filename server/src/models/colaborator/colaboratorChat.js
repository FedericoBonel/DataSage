import { Schema, Types as mongooseTypes } from "mongoose";
import { chatOwnerSchema } from "../chat/chatOwner.js";
import { validation, messages } from "../../utils/constants/index.js";

const colaboratorChatSchema = new Schema(
    {
        _id: {
            type: mongooseTypes.ObjectId,
            required: [true, messages.errors.validation.colaborator.chat.INVALID_ID],
        },
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
    },
);

export { colaboratorChatSchema };
