import { StatusCodes } from "http-status-codes";
import authServices from "../services/auth/auth.js";
import config from "../config/index.js";
import { SuccessPayload } from "../utils/responsebodies/index.js";
import { daysToMiliseconds } from "../utils/time/converters.js";

const refreshTokenCookieConfig = {
    httpOnly: true, // Set as an HTTP only cookie
    sameSite: "None", // Set it so that it can be used cross site
    secure: true, // Set it so that it's only used over HTTPs
};

/** Controller that handles all requests that ask to authenticate a user */
const login = async (req, res) => {
    const credentials = req.body;

    const [accessToken, refreshToken] = await authServices.authenticate(credentials);

    // Set the refresh token
    res.cookie(config.jwt.refreshTokenKey, refreshToken, {
        ...refreshTokenCookieConfig,
        maxAge: daysToMiliseconds(config.jwt.refreshTokenDaysDuration), // Set the expiration
    });

    return res.status(StatusCodes.OK).json(new SuccessPayload(accessToken));
};

/** Controller that handles all requests that ask to log a user out and remove their cookies from the browser */
const logout = async (req, res) => {
    const refreshToken = req.cookies?.[config.jwt.refreshTokenKey];

    await authServices.unauthenticate(refreshToken);

    // Remove the refresh token
    res.clearCookie(config.jwt.refreshTokenKey, refreshTokenCookieConfig);

    return res.status(StatusCodes.OK).json(new SuccessPayload());
};


/** Controller that handles all requests that ask to refresh an access token */
const refresh = async (req, res) => {
    const refreshToken = req.cookies?.[config.jwt.refreshTokenKey];

    const accessToken = await authServices.refreshToken(refreshToken);

    return res.status(StatusCodes.OK).json(new SuccessPayload(accessToken));
};

export default { login, logout, refresh };
