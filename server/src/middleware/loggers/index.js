import morgan from "morgan";
import config from "../../config/index.js";
import reqResLogger from "./reqResLogger.js";
import { logger } from "../../utils/loggers/index.js";

const morganNonDevFormat =
    ":remote-addr - :remote-user [:date[clf]] ':method :url HTTP/:http-version' :status :res[content-length] ':referrer' ':user-agent' :response-time ms";

/**
 * Adds http requests logging middleware to the server application
 * @param {*} server Express server application
 */
const addHttpLogger = (server) => {
    // Add console logger
    if (config.node_environment === "development") {
        server.use(morgan("dev"));
    } else {
        server.use(
            morgan(morganNonDevFormat, {
                stream: {
                    write: (message) => logger.info(message.trim()),
                },
            })
        );
    }
    // Add persistant logger to database
    server.use(reqResLogger);
};

export default addHttpLogger;
