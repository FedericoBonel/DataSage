import { StatusCodes } from "http-status-codes";
import { SuccessPayload } from "../utils/responsebodies/index.js";
import authServices from "../services/auth/auth.js";
import config from "../config/index.js";
import { daysToMiliseconds } from "../utils/time/converters.js";

/** Controller that handles all requests that ask to authenticate a user */
const login = async (req, res) => {
    const credentials = req.body;

    const [accessToken, refreshToken] = await authServices.authenticate(credentials);
    
    // Set the refresh token
    res.cookie(config.jwt.refreshTokenKey, refreshToken, {
        httpOnly: true, // Set as an HTTP only cookie
        sameSite: "None", // Set it so that it can be used cross site
        secure: true, // Set it so that it's only used over HTTPs
        maxAge: daysToMiliseconds(config.jwt.refreshTokenDaysDuration), // Set the expiration
    });

    return res.status(StatusCodes.OK).json(new SuccessPayload(accessToken));
};

export default { login };
