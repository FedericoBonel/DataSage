import { Schema } from "mongoose";
import { messages } from "../../utils/constants/index.js";

const appInfoSchema = new Schema({
    appVersion: { type: String, required: [true, messages.errors.validation.logging.appVersion.INVALID] },
    environment: { type: String, required: [true, messages.errors.validation.logging.environment.INVALID] },
    processId: { type: Number, required: [true, messages.errors.validation.logging.processId.INVALID] },
});

export { appInfoSchema };
