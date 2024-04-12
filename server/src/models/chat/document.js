import { Schema } from "mongoose";
import { validation, messages } from "../../utils/constants/index.js";

const documentsSchema = new Schema(
    {
        name: {
            type: String,
            minlength: validation.document.name.MIN_LENGTH,
            maxlength: validation.document.name.MAX_LENGTH,
            required: [true, messages.errors.validation.document.name.INVALID_LENGTH],
        },
        storeId: {
            type: String,
            minlength: validation.document.storeId.MIN_LENGTH,
            maxlength: validation.document.storeId.MAX_LENGTH,
            unique: true,
            required: [true, messages.errors.validation.document.storeId.INVALID]
        },
        size: {
            type: Number,
            min: 0,
            max: validation.document.size.MAX_BYTES,
            required: [true, messages.errors.validation.document.size.INVALID_SIZE],
        },
    },
    { timestamps: true }
);

export { documentsSchema };
