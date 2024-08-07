/** Contains all messages that contain info, normally shown in the server console or successful http requests. */
export default Object.freeze({
    /** Message to show when the server is shutting down */
    SERVER_SHUTDOWN: "SIGTERM signal received: closing server",
    /** Constructs the message to be shown in the console when server starts. */
    createServerRunningMessage: (port) => `Server is listening on port: ${port}`,
    /** Message to show when a request was processed successfully */
    REQUEST_SUCCESS: "Successful request",
});
