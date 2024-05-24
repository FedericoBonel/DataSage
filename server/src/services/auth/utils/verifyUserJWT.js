import jwtUtils from "jsonwebtoken";
import usersRepository from "../../../repositories/users/users.js";
import { UnauthorizedError } from "../../../utils/errors/index.js";
import { messages } from "../../../utils/constants/index.js";

/**
 * Utility function that verifies a JWT created for a user (access or refresh tokens) and returns the user as it is stored in database.
 *
 * It checks that it has been signed with the provided secret and that the user referenced in the
 * token payload exists, its verified and that it has changed their password since the token generation date.
 *
 * @throws {UnauthorizedError} if the token is invalid or any condition is not met
 * @returns The user the token references
 */
export default async (token, secret) => {
    let tokenPayload;
    try {
        // Verify the token has been signed with our secret
        tokenPayload = jwtUtils.verify(token, secret);
    } catch (error) {
        throw new UnauthorizedError(messages.errors.auth.INVALID_TOKEN);
    }

    // Verify the user the token belongs to has not changed their password and that it exists
    let user;
    try {
        user = await usersRepository.getById(String(tokenPayload._id));
    } catch (error) {
        throw new UnauthorizedError(messages.errors.auth.INVALID_TOKEN);
    }
    if (
        !(
            user &&
            tokenPayload.iat &&
            Math.floor(user.password.updatedAt.getTime() / 1000) <= tokenPayload.iat &&
            user.verified
        )
    ) {
        throw new UnauthorizedError(messages.errors.auth.INVALID_TOKEN);
    }
    return user;
};
