import { Schema, Types } from "mongoose";
import { messages } from "../../utils/constants/index.js";

const denormRelatedEntityTypeSchema = new Schema({
    _id: {
        type: Types.ObjectId,
        required: [true, messages.errors.validation.INVALID_ID],
    },
    name: {
        type: String,
        required: [true, messages.errors.validation.relatedEntityType.name.INVALID],
    },
});

export { denormRelatedEntityTypeSchema };
