import { Schema } from "mongoose";
import { requestSchema } from "./requestLog.js";
import { responseSchema } from "./responseLog.js";
import { appInfoSchema } from "./appInfoLog.js";
import { messages } from "../../utils/constants/index.js";

const metaLogSchema = new Schema({
    request: { type: requestSchema },
    response: { type: responseSchema },
    appInfo: { type: appInfoSchema, required: [true, messages.errors.validation.logging.appInfo.INVALID] },
});

export { metaLogSchema };
