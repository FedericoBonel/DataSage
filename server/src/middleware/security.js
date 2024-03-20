import helmet from "helmet";
import cors from "cors";

/**
 * Adds security middleware to the server application
 * @param {*} server Express server application
 */
const addSecurityMiddleware = (server) => {
    server.use(helmet());
    server.use(
        cors({
            origin: true,
            credentials: true,
        })
    );
};

export default addSecurityMiddleware;
