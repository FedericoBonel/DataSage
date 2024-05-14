import config from "../../config/index.js";
import redactLogData from "./sensitiveRedactor.js";

/** 
 * Formats metadata comming from HTTP requests and responses to log them.
 * @param {*} req Request as it comes from Express.
 * @param {*} res Response as it comes from Express.
 * @param {*} responseBody The body being appended and sent back to client in the response.
 * @param {number} requestStartTime The timestamp when the request was received in the server.
 * @param {Error} [caughtError] Optional, the error that was thrown during request processing. An error attribute with this object will be appended.  
 * @returns A formatted object with all relevant information for logging purposes.
 */
const formatHTTPMetadata = (req, res, responseBody, requestStartTime, caughtError) => {
    const metadata = {
        request: {
            headers: req.headers,
            host: req.headers.host,
            baseUrl: req.baseUrl,
            url: req.url,
            method: req.method,
            body: redactLogData(req.body),
            params: req?.params,
            query: req?.query,
            clientIp: req?.headers["X-Forwarded-For"] ?? req?.socket.remoteAddress,
            user: req?.user,
        },
        response: {
            headers: res.getHeaders(),
            statusCode: res.statusCode,
            requestDuration: requestStartTime ? `${Date.now() - requestStartTime} ms` : undefined,
            body: redactLogData(responseBody),
        },
        appInfo: {
            appVersion: config.server.version,
            environment: config.node_environment,
            processId: process.pid,
        },
    };

    if (caughtError) {
        metadata.error = caughtError;
    }
    return metadata;
};

export default formatHTTPMetadata;
