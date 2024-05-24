import express from "express";
import "express-async-errors";
import compression from "compression";
import cookieParser from "cookie-parser";
import config from "./src/config/index.js";
import rateLimitMiddleware from "./src/middleware/ratelimit.js";
import securityMiddleware from "./src/middleware/security.js";
import httpLoggerMiddleware from "./src/middleware/loggers/index.js";
import errorHandlingMiddleware from "./src/middleware/errors/index.js";
import configRoutes from "./src/routers/index.js";

/** Configured server application */
const app = express();
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Set the number of trusted proxies
app.set("trust proxy", config.server.proxies.max_trusted);

// Http logger
httpLoggerMiddleware(app);

// Rate limiter
rateLimitMiddleware(app);

// Security
securityMiddleware(app);

// Add all routes and handlers
configRoutes(app);

// Error Handling
errorHandlingMiddleware(app);

export default app;
