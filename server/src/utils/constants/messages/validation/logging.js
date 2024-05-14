/** Contains all logging error messages to be used in the application. */
export default Object.freeze({
    /** Contains all error messages to be shown when the log metadata is invalid */
    meta: {
        INVALID: "You must provide a metadata object for your log"
    },
    /** Contains all error messages to be shown when the app info is invalid */
    appInfo: {
        INVALID: "You must provide an app info object for your log",
    },
    /** Contains all error messages to be shown when the app version is invalid */
    appVersion: {
        INVALID: "You must provide an app version for your log as a string",
    },
    /** Contains all error messages to be shown when the app environment is invalid */
    environment: {
        INVALID: "You must provide an app environment for your log as a string",
    },
    /** Contains all error messages to be shown when the app process id is invalid */
    processId: {
        INVALID: "You must provide an app process id for your log as a number",
    },
    /** Contains all error messages to be shown when the log level is invalid */
    level: {
        INVALID: "You must provide a log level as a string",
    },
});
