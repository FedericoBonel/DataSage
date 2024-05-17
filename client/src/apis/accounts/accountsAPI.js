import { api } from "@/utils/constants";
import { makeRequest } from "@/lib/axios";

/**
 * Gets the logged in user information from the back end
 * @returns The server response payload with the logged in user information
 */
const getAccountInfo = async () => {
    return await makeRequest({
        url: api.urls.profile.GET,
        method: "get",
    });
};

export default { getAccountInfo };
