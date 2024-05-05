import winston from "winston";
import "winston-mongodb";
import config from "../../config/index.js";

/** Logger that stores logs permanently. Use this whenever you want a log to be persisted. */
const persistantLogger = winston.createLogger({
    format: winston.format.combine(
        // Parse json data
        winston.format.json(),
        // Add the metadata object (timestamps, etc.)
        winston.format.metadata()
    ),
    transports: [
        // Only log to database
        new winston.transports.MongoDB({
            db: config.logging.dbUrl,
            collection: config.logging.collectionName,
            options: { useUnifiedTopology: true },
        }),
    ],
    exceptionHandlers: [new winston.transports.Console({ handleExceptions: true, handleRejections: true })],
});

export default persistantLogger;
