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

/** Controller that handles all requests that ask to signup a new user and register it in the system */
const signup = async (req, res) => {
    const newUser = req.body;
    const { verificationLink } = req.query;

    const registeredUser = await authServices.register(newUser, verificationLink);

    return res.status(StatusCodes.CREATED).json(new SuccessPayload(registeredUser));
};

/** Controller that handles all requests that ask to verify a user in the system */
const verify = async (req, res) => {
    const { verificationCode } = req.query;

    const verifiedUser = await authServices.verifyUser(verificationCode);

    return res.status(StatusCodes.OK).json(new SuccessPayload(verifiedUser));
};

/** Controller that handles all requests that ask to generate an account recovery email for a user */
const recover = async (req, res) => {
    const { recoveryLink } = req.query;
    const { email } = req.body;

    await authServices.sendRecoveryEmail(email, recoveryLink);

    return res.status(StatusCodes.OK).json(new SuccessPayload());
};

export default { login, logout, refresh, signup, verify, recover };
