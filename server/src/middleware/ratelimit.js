import rateLimit from "express-rate-limit";
import config from "../config/index.js";

/**
 * Adds rate limiter middleware to the server application
 * @param {*} server Express server application
 */
const addRateLimiterMiddleware = (server) => {
    server.use(
        rateLimit({
            windowMs: config.server.ratelimit.min_window * 1000 * 60,
            max: config.server.ratelimit.max_requests,
            standardHeaders: true,
            legacyHeaders: false,
        })
    );
};

export default addRateLimiterMiddleware;
