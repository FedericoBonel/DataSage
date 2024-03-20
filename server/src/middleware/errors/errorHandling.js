import errorHandler from "./errorMiddleware.js";
import notFoundMiddleware from "./notFoundMiddleware.js";

/**
 * Adds error handling middleware to the server application
 * @param {*} server Express server application
 */
const addErrorHandlerMiddleware = (server) => {
    server.use(notFoundMiddleware);
    server.use(errorHandler);
};

export default addErrorHandlerMiddleware;
