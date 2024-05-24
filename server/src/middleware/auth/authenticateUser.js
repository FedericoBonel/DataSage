import authServices from "../../services/auth/auth.js";
import { UnauthorizedError } from "../../utils/errors/index.js";
import { messages } from "../../utils/constants/index.js";

/**
 * Validates the access token received from the client and appends the user to req.user
 *
 * If the access token is valid, redirects request and response to the next middleware,
 * otherwise throws an error.
 */
const verifyToken = async (req, res, next) => {
    // Verify the token was provided and extract it
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
        throw new UnauthorizedError(messages.errors.auth.INVALID_TOKEN);
    }
    const token = header.substring(7);

    // Validate the token content
    const loggedInUser = await authServices.validateAccessToken(token);

    // Append the logged in user to the request;
    req.user = loggedInUser;

    next();
};

export default verifyToken;
