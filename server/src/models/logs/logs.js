import { Schema, model } from "mongoose";
import { metaLogSchema } from "./metaLog.js";
import { validation, messages } from "../../utils/constants/index.js";
import config from "../../config/index.js";

const MODEL_NAME = "Log";

const COLLECTION_NAME = config.logging.collectionName;

const logSchema = new Schema({
    level: {
        type: String,
        validator: (level) => Object.values(validation.logs.levels).includes(level),
        required: [true, messages.errors.validation.logging.level.INVALID],
    },
    meta: { type: metaLogSchema, required: [true, messages.errors.validation.logging.meta.INVALID] },
});

const log = model(MODEL_NAME, logSchema, COLLECTION_NAME);

export { log, MODEL_NAME, COLLECTION_NAME };
