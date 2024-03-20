import winston from "winston";
import config from "../../config/index.js";

// Levels: ['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly']
/** Internal logger. */
const logger = winston.createLogger();

const customFormat = winston.format.printf(
    ({ level, timestamp, message, ...metadata }) =>
        `${level}: ${message} \n${
            metadata && Object.keys(metadata).length
                ? JSON.stringify(metadata, null, 4)
                : ""
        }`
);

// If we're not in production then we will log to the console with the format:
// `${info.level}: ${info.message} {...rest}`
if (config.node_environment !== "production") {
    logger.add(new winston.transports.Console({ format: customFormat }));
} else {
    logger.add(new winston.transports.Console());
}

export default logger;
