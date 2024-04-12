import mongoose from "mongoose";

/**
 * Initializes connection with database
 * @param {String} url URL connection string for server. Must include authentication information and database.
 * @returns Conection promise
 */
export default async (uri) => mongoose.connect(uri);
