import bcrypt from "bcrypt";
import config from "../../config/index.js";
import usersRepository from "../../repositories/users/users.js";
import profilesDTO from "../../dtos/profiles/index.js";
import { NotFoundError } from "../../utils/errors/index.js";
import { messages } from "../../utils/constants/index.js";

/**
 * Updates a user by id
 * @param {{email: string | undefined,
 *          password: string | undefined,
 *          names: string | undefined,
 *          lastnames: string | undefined}} updates The updates to be applied to the user
 * @param {string} userId The id of the user to update
 * @returns The user profile information as it should be exposed to the web.
 */
const updateById = async (updates, userId) => {
    const formattedData = { ...updates };
    // Verify if the password is being changed and encrypt it
    if (updates.password) {
        formattedData.password = await bcrypt.hash(updates.password, config.bcrypt.saltRounds);
    }

    const updatedUser = await usersRepository.updateById(profilesDTO.toUserModel(formattedData), userId);

    if (!updatedUser) {
        throw new NotFoundError(messages.errors.ROUTE_NOT_FOUND);
    }

    return profilesDTO.toProfileDTO(updatedUser);
};

export default { updateById };
