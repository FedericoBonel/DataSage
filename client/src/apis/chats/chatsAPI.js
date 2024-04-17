import { api } from "@/utils/constants";
import { makeRequest } from "@/lib/axios";

/**
 * Gets a list of chats from the back end for the logged in user
 * @param {object} filtering Filtering parameters
 * @param {string} filtering.ownership If the chats should be owned by the user or shared to them
 * @param {string} filtering.textSearch String to search the list of chats by
 * @param {object} pagination Pagination parameters
 * @param {number} pagination.page Page number to get results from
 * @param {number} pagination.limit Number of results per page
 * @returns The server response payload with the list of chats
 */
const getChats = async (filtering, pagination) => {
    const params = {
        ownership: filtering.ownership,
        textSearch:
            filtering.textSearch === "" ? undefined : filtering.textSearch,
        page: pagination.page,
        limit: pagination.limit,
    };

    return await makeRequest({
        url: api.urls.chats.GET_ALL,
        method: "get",
        params,
    });
};

export default { getChats };
