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

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
isDefined(ADMIN_EMAIL, "ADMIN_EMAIL");

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
isDefined(ADMIN_PASSWORD, "ADMIN_PASSWORD");

// Rate limiter configuration
const MAX_NUMBER_PROXIES = process.env.MAX_NUMBER_PROXIES;
isDefined(MAX_NUMBER_PROXIES, "MAX_NUMBER_PROXIES");

const RATELIMIT_MIN_WINDOW = process.env.RATELIMIT_MIN_WINDOW;
isDefined(RATELIMIT_MIN_WINDOW, "RATELIMIT_MIN_WINDOW");

const RATELIMIT_MAX_REQUESTS = process.env.RATELIMIT_MAX_REQUESTS;
isDefined(RATELIMIT_MAX_REQUESTS, "RATELIMIT_MAX_REQUESTS");

// Authorization configuration
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
isDefined(JWT_ACCESS_SECRET, "JWT_ACCESS_SECRET");

const JWT_ACCESS_EXPIRES_MIN = process.env.JWT_ACCESS_EXPIRES_MIN;
isDefined(JWT_ACCESS_EXPIRES_MIN, "JWT_ACCESS_EXPIRES_MIN");

const JWT_REFRESH_NAME = process.env.JWT_REFRESH_NAME;
isDefined(JWT_REFRESH_NAME, "JWT_REFRESH_NAME");

const JWT_REFRESH_EXPIRES_DAYS = process.env.JWT_REFRESH_EXPIRES_DAYS;
isDefined(JWT_REFRESH_EXPIRES_DAYS, "JWT_REFRESH_EXPIRES_DAYS");

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
isDefined(JWT_REFRESH_SECRET, "JWT_REFRESH_SECRET");

const BCRYPT_SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS;
isDefined(BCRYPT_SALT_ROUNDS, "BCRYPT_SALT_ROUNDS");

// OpenAPI configuration
const TEST_URL = process.env.OPEN_API_TEST_URL;
isDefined(TEST_URL, "TEST_URL");

const SWAGGER_THEME_URL = process.env.SWAGGER_THEME_URL;
isDefined(SWAGGER_THEME_URL, "SWAGGER_THEME_URL");

// Database connection
const DB_AUTH_URL = process.env.DATABASE_CONNECTION_URL;
isDefined(DB_AUTH_URL, "DATABASE_CONNECTION_URL");

// Cloud store configuration
const S3_ACCESS_KEY = process.env.S3_ACCESS_KEY;
isDefined(S3_ACCESS_KEY, "S3_ACCESS_KEY");

const S3_SECRET_KEY = process.env.S3_SECRET_KEY;
isDefined(S3_SECRET_KEY, "S3_SECRET_KEY");

const S3_REGION = process.env.S3_REGION;
isDefined(S3_REGION, "S3_REGION");

const S3_BUCKET = process.env.S3_BUCKET;
isDefined(S3_BUCKET, "S3_BUCKET");

// LLM Model configuration
const OPEN_AI_KEY = process.env.OPEN_AI_KEY;
isDefined(OPEN_AI_KEY, "OPEN_AI_KEY");

const OPEN_AI_GEN_MODEL = process.env.OPEN_AI_GEN_MODEL;
isDefined(OPEN_AI_GEN_MODEL, "OPEN_AI_GEN_MODEL");

const COHERE_API_KEY = process.env.COHERE_API_KEY;
isDefined(COHERE_API_KEY, "COHERE_API_KEY");

const COHERE_RERANK_MODEL = process.env.COHERE_RERANK_MODEL;
isDefined(COHERE_RERANK_MODEL, "COHERE_RERANK_MODEL");

const OPEN_AI_LLM_TEMPERATURE = process.env.OPEN_AI_LLM_TEMPERATURE;
isDefined(OPEN_AI_LLM_TEMPERATURE, "OPEN_AI_LLM_TEMPERATURE");

// Logging configuration
const LOGGING_DB_URL = process.env.LOGGING_DB_URL;
isDefined(LOGGING_DB_URL, "LOGGING_DB_URL");

const LOGGING_DB_COLLECTION = process.env.LOGGING_DB_COLLECTION;
isDefined(LOGGING_DB_COLLECTION, "LOGGING_DB_COLLECTION");

// Email configuration
const EMAIL_HOST = process.env.EMAIL_HOST;
isDefined(EMAIL_HOST, "EMAIL_HOST");

const EMAIL_PORT = process.env.EMAIL_PORT;
isDefined(EMAIL_PORT, "EMAIL_PORT");

const EMAIL_USER = process.env.EMAIL_USER;
isDefined(EMAIL_USER, "EMAIL_USER");

const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
isDefined(EMAIL_PASSWORD, "EMAIL_PASSWORD");

// Account recovery configuration
const RECOVERY_CODE_EXPIRES_MIN = process.env.RECOVERY_CODE_EXPIRES_MIN;
isDefined(RECOVERY_CODE_EXPIRES_MIN, "RECOVERY_CODE_EXPIRES_MIN");

/** Object with all configuration environment variables */
export default Object.freeze({
    /** Process related variables */
    process: {
        /** PID of the server process */
        id: process.pid,
    },
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
        admin: {
            /** Administrator email to create the first admin on system startup */
            email: ADMIN_EMAIL,
            /** Password for the first admin account */
            password: ADMIN_PASSWORD,
        },
    },
    /** bcrypt related variables */
    bcrypt: {
        /** Number of rounds to use in the bcrypts algorithm */
        saltRounds: Number(BCRYPT_SALT_ROUNDS),
    },
    /** JSON Web Token related variables */
    jwt: {
        /** The refresh token cookie name */
        refreshTokenKey: JWT_REFRESH_NAME,
        /** The refresh token duration in days */
        refreshTokenDaysDuration: Number(JWT_REFRESH_EXPIRES_DAYS),
        /** The refresh token cookie secret */
        refreshTokenSecret: JWT_REFRESH_SECRET,
        /** Access token secret */
        accessTokenSecret: JWT_ACCESS_SECRET,
        /** The access token duration in minutes */
        accessTokenMinDuration: Number(JWT_ACCESS_EXPIRES_MIN),
    },
    /** Swagger UI configuration related variables */
    swagger: {
        /** URL to the swagger theme */
        theme: SWAGGER_THEME_URL,
    },
    /** Database configuration related variables */
    db: {
        /** Database connection url */
        url: DB_AUTH_URL,
    },
    /** Cloud store configuration related variables (Amazon s3) */
    cloudStore: {
        accessKey: S3_ACCESS_KEY,
        secretKey: S3_SECRET_KEY,
        region: S3_REGION,
        bucketName: S3_BUCKET,
    },
    /** Large language models related variables (Access keys, etc.) */
    llm: {
        /** Large language model API Key being used. (Currently OpenAI) */
        apiKey: OPEN_AI_KEY,
        /** Large language model temperature value. */
        temperature: Number(OPEN_AI_LLM_TEMPERATURE),
        /** Reranker api key */
        rerankerApiKey: COHERE_API_KEY,
        /** Reranker model to be used */
        rerankerModel: COHERE_RERANK_MODEL,
        /** Generation model to be used */
        generationModel: OPEN_AI_GEN_MODEL,
    },
    /** Logging related variables */
    logging: {
        /** URL for database conection with credentials */
        dbUrl: LOGGING_DB_URL,
        /** Logs collection name to be used. */
        collectionName: LOGGING_DB_COLLECTION,
    },
    /** Email configuration related variables */
    mail: {
        /** Email service provider */
        host: EMAIL_HOST,
        /** The SMTP port to be used in the server */
        port: Number(EMAIL_PORT),
        /** The auth user for the host provided */
        auth: {
            /** The email user credential */
            user: EMAIL_USER,
            /** The email password credential */
            pass: EMAIL_PASSWORD,
        },
    },
    /** Account recovery related variables */
    accountRecovery: {
        /** The duration time in minutes for account recovery codes */
        durationMins: Number(RECOVERY_CODE_EXPIRES_MIN),
    },
});
