import { StatusCodes } from "http-status-codes";
import profilesServices from "../services/profiles/profiles.js";
import { SuccessPayload } from "../utils/responsebodies/index.js";

/** Controller that handles all requests that ask for the logged in user profile information */
const get = async (req, res) => {
    const loggedInUser = req.user;

    const profileInformation = await profilesServices.getProfile(loggedInUser);

    return res.status(StatusCodes.OK).json(new SuccessPayload(profileInformation));
};

export default { get };
