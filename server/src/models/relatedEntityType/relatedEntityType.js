import { Schema, model } from "mongoose";
import { messages } from "../../utils/constants/index.js";

const MODEL_NAME = "RelatedEntityType";
const COLLECTION_NAME = "relatedEntityTypes";

const relatedEntityTypeSchema = new Schema({
    name: {
        type: String,
        required: [true, messages.errors.validation.relatedEntityType.name.INVALID],
    },
});

const relatedEntityType = model(MODEL_NAME, relatedEntityTypeSchema, COLLECTION_NAME);

export { relatedEntityType, MODEL_NAME };
