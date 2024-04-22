import { Schema, model, Types } from "mongoose";
import { validation, messages } from "../../utils/constants/index.js";

const MODEL_NAME = "Page";
const vectorIndex = Object.freeze({
    NAME: "page-vector-index",
    INDEXED_FIELD: "vector",
    EMBEDDED_CONTENT_FIELD: "content",
});

const pageSchema = new Schema(
    {
        document: { type: Types.ObjectId, required: [true] },
        documentStr: { type: String, required: [true] },
        content: {
            type: String,
            required: [true, messages.errors.validation.page.content.INVALID],
        },
        vector: {
            type: [Number],
            validate: (vector) => vector?.length && vector?.length === validation.page.vector.LENGTH,
            required: [true, messages.errors.validation.page.vector.INVALID_LENGTH],
        },
        locationPage: {
            type: Number,
            min: 0,
            required: [true, messages.errors.validation.page.locationPage.INVALID],
        },
    },
    { timestamps: true }
);

const page = model(MODEL_NAME, pageSchema);

export { page, MODEL_NAME, vectorIndex };
