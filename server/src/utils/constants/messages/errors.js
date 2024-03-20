/** Contains all error messages to be sent to the user. */
export default Object.freeze({
    /** Error message to return when an unexpected internal error happened. */
    INTERNAL_SERVER_ERROR:
        "An internal server error ocurred, please try again. If this problem persists, contact an administrator.",
    /** Error message to return when a request did not find any handlers or middleware. */
    ROUTE_NOT_FOUND: "The requested resource was not found.",
    /** Constructs an error that happened during server initialization */
    createServerInitializationError: (error) =>
        `An error happened during server initialization: ${error}`,
});
