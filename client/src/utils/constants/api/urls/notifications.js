import config from "@/config";

const NOTIFICATIONS_RESOURCE = "notifications";

export default {
    /** Notifications resource name */
    RESOURCE: NOTIFICATIONS_RESOURCE,
    /** Endpoint to get all notifications */
    GET_ALL: `${config.api.BASE_URL}/${NOTIFICATIONS_RESOURCE}`,
    /** Endpoint to get the number of notifications not read by the logged in user */
    GET_NOT_READ: `${config.api.BASE_URL}/${NOTIFICATIONS_RESOURCE}/notread`,
};
