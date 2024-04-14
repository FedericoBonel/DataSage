import { Schema, Types } from "mongoose";
import { messages } from "../../utils/constants/index.js";

const messagesPagesSchema = new Schema(
    {
        _id: {
            type: Types.ObjectId,
            required: [true, messages.errors.validation.INVALID_ID],
        },
        content: {
            type: String,
            required: [true, messages.errors.validation.page.content.INVALID],
        },
        locationPage: {
            type: Number,
            min: 0,
            required: [true, messages.errors.validation.page.locationPage.INVALID],
        },
        document: { type: Types.ObjectId, required: [true] },
    },
    { timestamps: true }
);

export { messagesPagesSchema };
