import config from "@/config";

const AUTH_RESOURCE = "auth";

export default {
    /** Auth resource name */
    RESOURCE: AUTH_RESOURCE,
    /** Endpoint to refresh access tokens */
    REFRESH: `${config.api.BASE_URL}/${AUTH_RESOURCE}/refresh`,
    /** Endpoint to login a user and generate access and refresh token from credentials*/
    LOGIN: `${config.api.BASE_URL}/${AUTH_RESOURCE}/login`,
};
