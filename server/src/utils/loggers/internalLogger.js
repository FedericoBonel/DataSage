import winston from "winston";
import config from "../../config/index.js";
import { logging } from "../constants/index.js";

const customFormat = winston.format.printf(
    ({ level, timestamp, message, ...metadata }) =>
        `${level}: ${message} \n${
            metadata && Object.keys(metadata).length
                ? JSON.stringify(metadata, null, logging.formatting.JSON_INDENT)
                : ""
        }`
);

/** Internal logger to log things in the console. */
const logger = winston.createLogger({
    format: winston.format.printf(({ timestamp, level, message, ...data }) => {
        const response = {
            level, // Log Level
            timestamp, // Log timestamp
            message, // Log message
            data, // Any other extra data
        };

        return JSON.stringify(response, null, 4);
    }),
    transports: [
        // If the environment is not production use custom reduced format, otherwise use the default one.
        // Only log on console
        new winston.transports.Console({
            format: config.node_environment !== "production" ? customFormat : undefined,
            handleExceptions: true,
            handleRejections: true,
        }),
    ],
});

export default logger;
