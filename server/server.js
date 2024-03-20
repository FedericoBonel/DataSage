import { logger } from "./src/utils/loggers/index.js";
import { messages } from "./src/utils/constants/index.js";
import config from "./src/config/index.js";
import app from "./app.js";

const startServer = async () => {
    let server;
    try {
        server = app.listen(config.server.port, () =>
            logger.info(messages.info.createServerRunningMessage(config.server.port))
        );
    } catch (error) {
        logger.error(messages.errors.createServerInitializationError(error));
        process.exit(1);
    }
    return server;
};

const server = await startServer();

process.on("SIGTERM", () => {
    logger.warn(messages.info.SERVER_SHUTDOWN);
    if (server) server.close();
});
