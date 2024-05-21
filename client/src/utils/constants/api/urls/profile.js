import config from "@/config";

const PROFILE_RESOURCE = "profile";

export default {
    /** User profile resource name */
    RESOURCE: PROFILE_RESOURCE,
    /** Endpoint to get the logged in user profile information */
    GET: `${config.api.BASE_URL}/${PROFILE_RESOURCE}`,
    /** Endpoint to update the logged in user profile information */
    UPDATE: `${config.api.BASE_URL}/${PROFILE_RESOURCE}`,
    /** Endpoint to delete the logged in user and its profile from the system */
    DELETE: `${config.api.BASE_URL}/${PROFILE_RESOURCE}`,
};