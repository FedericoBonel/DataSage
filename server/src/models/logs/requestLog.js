import { Schema } from "mongoose";

const requestSchema = new Schema({
    headers: { type: Object },
    host: { type: String },
    baseUrl: { type: String },
    url: { type: String },
    method: { type: String },
    body: { type: {} },
    params: { type: Object },
    query: { type: Object },
    clientIp: { type: String },
    user: { type: Object },
});

export { requestSchema };
