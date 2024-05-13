import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

/** MongoDB Server in memory */
let mongoServer = await MongoMemoryServer.create();

/**
 * Initializes connection with in memory database. Good for development or testing.
 * @param {String} url URL connection string for server. Must include authentication information and database.
 * @returns Connection promise
 */
export const connect = async () => {
    if (!mongoServer) mongoServer = await MongoMemoryServer.create();
    if (mongoServer) mongoose.connect(mongoServer.getUri());
};

/**
 * Disconnects from database in memory and closes it up (Cleaning any information saved in it).
 */
export const disconnect = async () => {
    if (mongoServer) {
        await mongoose.disconnect();
        await mongoose.connection.close();
        await mongoServer.stop();
        mongoServer = null;
    }
};
