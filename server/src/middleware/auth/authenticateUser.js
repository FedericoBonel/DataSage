/**
 * Validates the JWT received from the client and appends the user to req.user
 *
 * If the JWT is valid, redirects request and response to the next middleware,
 * otherwise throws an error.
 */
const verifyToken = async (req, res, next) => {
    // TODO Implement this when we have authentication

    req.user = {
        _id: "6629c9afb2066717d74c3ec7",
        names: "Test names",
        lastnames: "Test lastnames",
        email: "test@mail.com",
    };

    next();
};

export default verifyToken;
