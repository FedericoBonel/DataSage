import bcrypt from "bcrypt";
import config from "../../config/index.js";
import usersRepository from "../../repositories/users/users.js";
import profilesDTO from "../../dtos/profiles/index.js";
import { NotFoundError, BadRequestError, UnauthorizedError } from "../../utils/errors/index.js";
import { messages } from "../../utils/constants/index.js";

/**
 * Updates a user by id
 * @param {{credentials:
 *          {
 *              newEmail: string,
 *              newPassword: string,
 *              password: string
 *          } | undefined,
 *          names: string | undefined,
 *          lastnames: string | undefined}} updates The updates to be applied to the user
 * @param {string} userId The id of the user to update
 * @returns The user profile information as it should be exposed to the web.
 */
const updateById = async (updates, userId) => {
    const { credentials, ...formattedData } = { ...updates };

    if (credentials?.newEmail || credentials?.newPassword) {
        // If credentials are changing verify the user password
        const foundUser = await usersRepository.getById(userId);
        const passMatches =
            credentials.password && (await bcrypt.compare(credentials?.password, foundUser.password.content));
        if (!passMatches) throw new UnauthorizedError(messages.errors.auth.INVALID_PASSWORD);

        // Check that a verified user with the same email does not exist
        if (credentials?.newEmail) {
            const userWithSameEmail = await usersRepository.getByEmail(credentials.newEmail);

            if (userWithSameEmail && userWithSameEmail._id.toString() !== userId) {
                // If the user is verified, throw error, otherwise delete it to override it
                if (foundUser.verified) {
                    throw new BadRequestError(messages.errors.validation.user.email.INVALID);
                } else {
                    await usersRepository.deleteById(foundUser._id);
                }
            }

            formattedData.email = credentials.newEmail;
        }

        // If the password is changing encrypt it
        if (credentials?.newPassword)
            formattedData.password = await bcrypt.hash(credentials.newPassword, config.bcrypt.saltRounds);
    }

    const updatedUser = await usersRepository.updateById(profilesDTO.toUserModel(formattedData), userId);

    if (!updatedUser) {
        throw new NotFoundError(messages.errors.ROUTE_NOT_FOUND);
    }

    return profilesDTO.toProfileDTO(updatedUser);
};

/**
 * Deletes a user by id
 * @param {String} userId The id of the user being deleted
 * @returns The deleted user public information.
 */
const deleteById = async (userId) => {
    const deletedUser = await usersRepository.deleteById(userId);

    if (!deletedUser) {
        throw new NotFoundError(messages.errors.ROUTE_NOT_FOUND);
    }

    return profilesDTO.toProfileDTO(deletedUser);
};

export default { updateById, deleteById };
