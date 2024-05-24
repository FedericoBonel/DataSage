import { StatusCodes } from "http-status-codes";
import profilesServices from "../services/profiles/profiles.js";
import userServices from "../services/users/users.js";
import { SuccessPayload } from "../utils/responsebodies/index.js";

/** Controller that handles all requests that ask for the logged in user profile information */
const get = async (req, res) => {
    const loggedInUser = req.user;

    const profileInformation = await profilesServices.getProfile(loggedInUser);

    return res.status(StatusCodes.OK).json(new SuccessPayload(profileInformation));
};

/** Controller that handles all requests that ask to update the logged in user profile information */
const update = async (req, res) => {
    const loggedInUser = req.user;
    const updates = req.body;

    const profileInformation = await userServices.updateById(updates, loggedInUser._id);

    return res.status(StatusCodes.OK).json(new SuccessPayload(profileInformation));
};

/** Controller that handles all requests that ask to delete the logged in user and all its information from the system. */
const deleteUser = async (req, res) => {
    const loggedInUser = req.user;

    const deletedUser = await userServices.deleteById(loggedInUser._id);

    return res.status(StatusCodes.OK).json(new SuccessPayload(deletedUser));
}

export default { get, update, deleteUser };
