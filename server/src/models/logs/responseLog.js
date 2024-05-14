import { Schema } from "mongoose";

const responseSchema = new Schema({
    headers: { type: Object },
    statusCode: { type: Number },
    requestDuration: { type: String },
    body: { type: Object },
});

export { responseSchema };
