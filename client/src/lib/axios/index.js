import axios from "axios";
import authAPI from "@/apis/auth/authAPI";
import { api } from "@/utils/constants";
import authCookies from "@/utils/cookies/auth";

// Instace to be used in each request
const apiInstance = axios.create({
    baseURL: api.urls.BASE,
    withCredentials: true,
    formSerializer: {
        indexes: null,
    },
});

// In every request append the access token when available and not already appended
apiInstance.interceptors.request.use((config) => {
    if (!config.headers.Authorization) {
        const accessCookie = authCookies.getAccessToken();
        if (accessCookie) {
            config.headers.Authorization = `Bearer ${accessCookie.token || ""}`;
        }
    }
    return config;
});

// Whenever there is an error check if the error is 401 and if there is an access cookie
// If there is one, then ask for a token refresh since it could be refreshed and if the refresh request is successful
// set the new access token in the cookies and in the responses that threw error and retry them
// If it was not successful then bubble up the error
let refreshingToken;
apiInstance.interceptors.response.use(
    (res) => res,
    async (error) => {
        const prevReq = error?.config;
        const accessCookie = authCookies.getAccessToken();
        if (error?.response?.status === 401 && !prevReq?.sent && accessCookie) {
            // Avoid infinite loops
            prevReq.sent = true;

            // If no request is currently being trying to refresh, then refresh
            if (!refreshingToken) {
                refreshingToken = authAPI
                    .refreshAccessToken()
                    // If everything went well then set the access token cookie
                    .then((response) => {
                        authCookies.setAccessToken(response?.data?.token);
                        return response;
                    })
                    // If the refresh token expired remove it and bubble up error
                    .catch((err) => {
                        if (err?.response?.status === 401) {
                            authCookies.removeAccessToken();
                        }
                        return Promise.reject(err);
                    })
                    // Whenever you finish reset the token promise, even if an error happened
                    .finally(() => {
                        refreshingToken = null;
                    });
            }

            // All requests that came after the one requesting a refresh should wait for the new token and append it when available
            return refreshingToken.then((response) => {
                prevReq.headers = prevReq?.headers?.toJSON();
                prevReq.headers.Authorization = `Bearer ${response?.data.token}`;
                return apiInstance(prevReq);
            });
        }
        return Promise.reject(error);
    }
);

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

/**
 * Returns the axios static library for edge cases where more control is needed
 * @returns The axios static library
 */
export const getStatic = axios;
