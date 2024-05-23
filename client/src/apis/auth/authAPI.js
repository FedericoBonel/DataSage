import { getStatic, makeRequest } from "@/lib/axios";
import { api } from "@/utils/constants";
import config from "@/config";

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
 * Function that signs up a user to the appplication
 * @param {{email: string,
 *          password: string,
 *          names: string,
 *          lastnames: string}} newAccount The object with the information of the new account to be registered
 * @returns The response with the public information of the new account. NO TOKEN IS RETURNED, you should ask the user to check their email.
 */
const signUp = async (newAccount) => {
    const params = { verificationLink: config.api.VERIFICATION_LINK };
    return makeRequest({
        url: api.urls.auth.SIGNUP,
        method: "post",
        data: newAccount,
        params,
    });
};

/**
 * Function that verifies a user account by verification code
 * @param {{verificationCode: string}} code The object with the verification code of the user
 * @returns The response with the public information of the verified account. NO TOKEN IS RETURNED, you should ask the user to sign in using their credentials.
 */
const verifyAccount = async (code) => {
    const params = { verificationCode: code.verificationCode };
    return makeRequest({
        url: api.urls.auth.VERIFY,
        method: "post",
        params,
    });
};

/**
 * Function that sends an account recovery email to a user by email
 *
 * @param {{email: string}} email The object with the email of the user that needs to recover their account
 * @returns The response with the success flag (No data is returned).
 */
const recoverAccount = async (email) => {
    const params = { recoveryLink: config.api.RECOVERY_LINK };
    return makeRequest({
        url: api.urls.auth.RECOVER,
        method: "post",
        data: email,
        params,
    });
};

/**
 * Function that resets a user password by recovery code
 *
 * @param {{password: string}} password The object with the new password.
 * @param {string} recoveryCode The recovery code of the user that wishes to reset their password.
 * @returns The response with the success flag (No data is returned).
 */
const resetPassword = async (password, recoveryCode) => {
    const params = { recoveryCode };
    return makeRequest({
        url: api.urls.auth.RESET_PASSWORD,
        method: "post",
        data: password,
        params,
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

export default {
    refreshAccessToken,
    login,
    logout,
    signUp,
    verifyAccount,
    recoverAccount,
    resetPassword,
};
