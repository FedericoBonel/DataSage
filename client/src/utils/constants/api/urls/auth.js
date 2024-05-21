import config from "@/config";

const AUTH_RESOURCE = "auth";

export default {
    /** Auth resource name */
    RESOURCE: AUTH_RESOURCE,
    /** Endpoint to refresh access tokens */
    REFRESH: `${config.api.BASE_URL}/${AUTH_RESOURCE}/refresh`,
    /** Endpoint to signup a user to the application */
    SIGNUP: `${config.api.BASE_URL}/${AUTH_RESOURCE}/signup`,
    /** Endpoint to verify a user account in the application and allow the user to start using it. */
    VERIFY: `${config.api.BASE_URL}/${AUTH_RESOURCE}/verify`,
    /** Endpoint to login a user and generate access and refresh token from credentials */
    LOGIN: `${config.api.BASE_URL}/${AUTH_RESOURCE}/login`,
    /** Endpoint to logout a user and remove refresh token from browser HTTP Only cookies */
    LOGOUT: `${config.api.BASE_URL}/${AUTH_RESOURCE}/logout`,
};
