import { toProfileDTO } from "./ProfileDTO/index.js";

/**
 * Transforms a profile information as it is exposed in the api for to how it should be stored in the database.
 *
 * IMPORTANT NOTE: This function does not encrypt the password, if provided you should encrypt it before hand
 * @param {*} inputDTO The profile as it is exposed
 * @returns The formatted user information to be stored in database
 */
const toUserModel = (inputDTO) => {
    const update = {};
    if (inputDTO.names) {
        update.names = inputDTO.names;
    }
    if (inputDTO.lastnames) {
        update.lastnames = inputDTO.lastnames;
    }
    if (inputDTO.email) {
        update.email = inputDTO.email;
    }
    if (inputDTO.password) {
        update.password = { content: inputDTO.password };
    }
    if (inputDTO.verificationCode) {
        update.verificationCode = inputDTO.verificationCode;
    }
    return update;
};

export default { toProfileDTO, toUserModel };
