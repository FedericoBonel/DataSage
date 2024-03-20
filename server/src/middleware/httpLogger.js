/**
 * Http Logger middleware
 */
import morgan from "morgan";
import config from "../config/index.js";
import { logger } from "../utils/loggers/index.js";

/**
 * Adds http requests middleware to the server application
 * @param {*} server Express server application
 */
const addHttpLogger = (server) => {
    if (config.node_environment === "development") {
        server.use(morgan("dev"));
    } else {
        server.use(
            morgan(
                ":remote-addr - :remote-user [:date[clf]] ':method :url HTTP/:http-version' :status :res[content-length] ':referrer' ':user-agent' :response-time ms",
                {
                    stream: {
                        write: (message) => logger.info(message.trim()),
                    },
                }
            )
        );
    }
};

export default addHttpLogger;
