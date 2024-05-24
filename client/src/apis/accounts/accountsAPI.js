import { api } from "@/utils/constants";
import { makeRequest } from "@/lib/axios";

/**
 * Updates the logged in user information from the back end
 * @param {{names: string | undefined,
 *          lastnames: string | undefined,
 *          email: string | undefined,
 *          password: email | undefined}} updates Updates to be applied to the logged in user information
 * @returns The server response payload with the updated logged in user information
 */
const updateAccountInformation = async (updates) => {
    return await makeRequest({
        url: api.urls.profile.UPDATE,
        method: "PATCH",
        data: updates,
    });
};

/**
 * Deletes the user account from the back end and all of its information.
 *
 * IMPORTANT NOTE: Be extremely careful of wherever you call this. This will delete the user forever from the system.
 * @returns The server response payload with the deleted user information.
 */
const deleteAccount = async () => {
    return await makeRequest({
        url: api.urls.profile.DELETE,
        method: "DELETE",
    });
};

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

export default { updateAccountInformation, getAccountInfo, deleteAccount };
