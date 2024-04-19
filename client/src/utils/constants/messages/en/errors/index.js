export default Object.freeze({
    /** Message to be shown in the error page title */
    errorTitle: "Something went wrong",
    /** Messages to be shown by HTTP error code in the error page. */
    errorCode: {
        400: "Hm, that didn't work. It seems there's a problem with the information you provided. Please try again.",
        401: "Access Denied! Looks like you are not logged in. Make sure you're logged in with the right credentials or reach out to our support team for help.",
        403: "Access Denied! It seems like you don't have permission to view this page. If you need it reach out to customer support.",
        404: "Looks like you took a wrong turn. This page or resource doesn't exist.",
        default:
            "Uh-oh! Something went wrong on our end. If this message persists, please contact customer support.",
    },
    /** Default message to be shown in the exit link of an error */
    GO_TO_HOMEPAGE: "Go back to homepage",
});
