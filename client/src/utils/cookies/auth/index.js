import cookies from "js-cookie";

/** Access token cookie key */
export const ACCESS_TOKEN_KEY = "access_token";

/** 
 * Gets the access token in the browser and returns it
 * @returns {{token: String}} The access token object 
 */
const getAccessToken = () => {
    const rawCookie = cookies.get(ACCESS_TOKEN_KEY);
    if (!rawCookie) return rawCookie;
    return JSON.parse(rawCookie);
};

/** 
 * Sets the access token cookie in the browser and returns it 
 * @param {string} accessToken The access token by it self
 */
const setAccessToken = (accessToken) =>
    cookies.set(ACCESS_TOKEN_KEY, JSON.stringify({ token: accessToken }), {
        expires: 1,
    });

/** Removes the access token cookie from the browser and returns it */
const removeAccessToken = () => cookies.remove(ACCESS_TOKEN_KEY);

export default { getAccessToken, setAccessToken, removeAccessToken };
