import mongoose from "mongoose";
import config from "../../config/index.js";

const options = {
    // Only generate indexes if in development
    autoIndex: config.node_environment === "development",
};

/**
 * Initializes connection with database
 * @param {String} url URL connection string for server. Must include authentication information and database.
 * @returns Conection promise
 */
export default async (uri) => mongoose.connect(uri, options);
