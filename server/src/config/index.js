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

const API_URL = process.env.API_URL;
isDefined(API_URL, "API_URL");

// Rate limiter configuration
const MAX_NUMBER_PROXIES = process.env.MAX_NUMBER_PROXIES;
isDefined(MAX_NUMBER_PROXIES, "MAX_NUMBER_PROXIES");

const RATELIMIT_MIN_WINDOW = process.env.RATELIMIT_MIN_WINDOW;
isDefined(RATELIMIT_MIN_WINDOW, "RATELIMIT_MIN_WINDOW");

const RATELIMIT_MAX_REQUESTS = process.env.RATELIMIT_MAX_REQUESTS;
isDefined(RATELIMIT_MAX_REQUESTS, "RATELIMIT_MAX_REQUESTS");

// Authorization configuration
const JWT_SECRET = process.env.JWT_SECRET;
isDefined(JWT_SECRET, "JWT_SECRET");

// OpenAI configuration
const TEST_URL = process.env.OPEN_API_TEST_URL;
isDefined(TEST_URL, "TEST_URL");

const SWAGGER_THEME_URL = process.env.SWAGGER_THEME_URL;
isDefined(SWAGGER_THEME_URL, "SWAGGER_THEME_URL");

/** Object with all configuration environment variables */
export default Object.freeze({
    /** Current node environment (production || development) */
    node_environment: process.env.NODE_ENV,
    /** Server configuration related variables */
    server: {
        /** The port where the server is running */
        port: PORT,
        /** Proxy related configuration variables */
        proxies: {
            /** Maximum number of proxies to be trusted by this server */
            max_trusted: MAX_NUMBER_PROXIES,
        },
        /** Rate limiter related configuration variables */
        ratelimit: {
            /** Window size in minutes for rate limiting purposes */
            min_window: RATELIMIT_MIN_WINDOW,
            /** Maximum number of requests to be allowed by user per window */
            max_requests: RATELIMIT_MAX_REQUESTS,
        },
        /** The current version of the application */
        version: API_VERSION,
        /** Url related configuration variables */
        urls: {
            /** Api url without the host and last "/" (i.g. "/api/v1") */
            api: API_URL,
            /** Test api url without the host and last "/" (i.g. "/test/api/v1") */
            test: TEST_URL,
        },
    },
    /** JSON Web Token related variables */
    jwt: {
        /** JWT secret */
        secret: JWT_SECRET,
    },
    /** Swagger UI configuration related variables */
    swagger: {
        /** URL to the swagger theme */
        theme: SWAGGER_THEME_URL,
    },
});
