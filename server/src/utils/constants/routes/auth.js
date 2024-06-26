/** Contains all routes for auth resources. */
export default Object.freeze({
    /** Base route of all auth routes. */
    AUTH: "auth",
    /** Route to login resource */
    LOGIN: "login",
    /** Route to logout resource */
    LOGOUT: "logout",
    /** Route to refresh token resource */
    REFRESH: "refresh",
    /** Route to the signup resource */
    SIGNUP: "signup",
    /** Route to the account verification resource */
    VERIFY: "verify",
    /** Route to the account recovering resource */
    RECOVER: "recover",
    /** Route to the account recovering credentials resource used to reset user credentials from a recovery code */
    CREDENTIALS: "credentials",
});
