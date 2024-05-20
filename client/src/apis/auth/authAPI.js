import { getStatic, makeRequest } from "@/lib/axios";
import { api } from "@/utils/constants";

/**
 * Function that logs in a user with an email and a password
 * @param {{email: string, password: string}} credentials The object with the email and password of the user to log in
 * @returns The response with the access token for the user in the payload and the refresh token in the http only cookies.
 */
const login = async (credentials) => {
    return makeRequest({
        url: api.urls.auth.LOGIN,
        method: "post",
        data: credentials,
    });
};

/**
 * Function that logs out a user and removes its HTTP Only credentials from the server
 * @returns The response with the HTTP Only cookie removal header for the access token.
 */
const logout = async () => {
    return makeRequest({
        url: api.urls.auth.LOGOUT,
        method: "post",
    });
};

/**
 * Function that refreshes the access token using the HTTP Only refresh token saved in the browser cookies
 * @returns The response from the refresh token back end resource
 */
const refreshAccessToken = () =>
    getStatic
        .get(api.urls.auth.REFRESH, {
            withCredentials: true,
        })
        .then((response) => response.data);

export default { refreshAccessToken, login, logout };
