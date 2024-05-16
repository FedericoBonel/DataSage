import { toProfileDTO } from "./ProfileDTO/index.js";

/**
 * Transforms a profile information as it is exposed in the api for chat update to how it should be stored in the database.
 *
 * IMPORTANT NOTE: This function does not encrypt the password, if provided you should encrypt it before hand
 * @param {*} profileUpdateDTO The profile as it is exposed for being updated
 * @returns The formatted user information to be stored in database
 */
const toUserModel = (profileUpdateDTO) => {
    const update = {};
    if (profileUpdateDTO.names) {
        update.names = profileUpdateDTO.names;
    }
    if (profileUpdateDTO.lastnames) {
        update.lastnames = profileUpdateDTO.lastnames;
    }
    if (profileUpdateDTO.email) {
        update.email = profileUpdateDTO.email;
    }
    if (profileUpdateDTO.password) {
        update.password = { content: profileUpdateDTO.password };
    }
    return update;
};

export default { toProfileDTO, toUserModel };
