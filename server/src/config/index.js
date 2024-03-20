/** Contains all environment variables in a centralized manner and makes them available server wide. */
import dotenv from "dotenv";

dotenv.config();

/**
 * Verifies the existence of a given variable in the .env file. If it is not present, an error message
 * telling the user to provide it
 * @param {*} variable The value of the environment variable
 * @param {string} name The name of the environment variable
 */
const isDefined = (variable, name) => {
    if (!variable) {
        throw new Error(`The environment variable  "${name}" is not defined, please define it or provide it`);
    }
};

// Export and check for environment variables

// General server configuration
const PORT = process.env.PORT;
isDefined(PORT, "PORT");
const API_VERSION = process.env.API_VERSION;
isDefined(API_VERSION, "API_VERSION");

// Rate limiter configuration
const MAX_NUMBER_PROXIES = process.env.MAX_NUMBER_PROXIES;
isDefined(MAX_NUMBER_PROXIES, "MAX_NUMBER_PROXIES");

const RATELIMIT_MIN_WINDOW = process.env.RATELIMIT_MIN_WINDOW;
isDefined(RATELIMIT_MIN_WINDOW, "RATELIMIT_MIN_WINDOW");

const RATELIMIT_MAX_REQUESTS = process.env.RATELIMIT_MAX_REQUESTS;
isDefined(RATELIMIT_MAX_REQUESTS, "RATELIMIT_MAX_REQUESTS");

// Authorization configuration
const JWT_SECRET = process.env.JWT_SECRET;
isDefined(JWT_SECRET);

export default Object.freeze({
    node_environment: process.env.NODE_ENV,
    server: {
        port: PORT,
        proxies: {
            max_trusted: MAX_NUMBER_PROXIES,
        },
        ratelimit: {
            min_window: RATELIMIT_MIN_WINDOW,
            max_requests: RATELIMIT_MAX_REQUESTS,
        },
        version: API_VERSION,
    },
    jwt: {
        secret: JWT_SECRET,
    },
});
