import axios from "axios";
import { api } from "@/utils/constants";

// Instace to be used in each request
const apiInstance = axios.create({
    baseURL: api.urls.BASE,
    withCredentials: true,
    formSerializer: {
        indexes: null,
    },
});

/**
 * Makes an HTTP request to the backend.
 *
 * NOTE: This call does not handle errors.
 * @param {*} config Axios configuration object.
 * @returns The data received from the backend.
 */
export const makeRequest = async (config) => {
    const response = await apiInstance(config);
    return response.data;
};
