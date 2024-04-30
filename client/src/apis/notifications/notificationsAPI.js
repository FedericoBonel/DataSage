import { api } from "@/utils/constants";
import { makeRequest } from "@/lib/axios";

/**
 * Gets the number of notifications that have not been read by the logged in user.
 * @returns The server response payload with the number of notifications
 */
const getNotReadCount = async () => {
    return await makeRequest({
        url: api.urls.notifications.GET_NOT_READ,
        method: "get",
    });
};

export default {
    getNotReadCount,
};
