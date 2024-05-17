import config from "@/config";

const PROFILE_RESOURCE = "profile";

export default {
    /** User profile resource name */
    RESOURCE: PROFILE_RESOURCE,
    /** Endpoint to get the logged in user profile information */
    GET: `${config.api.BASE_URL}/${PROFILE_RESOURCE}`,
};