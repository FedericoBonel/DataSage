import bcrypt from "bcrypt";
import jwtUtils from "jsonwebtoken";
import usersRepository from "../../repositories/users/users.js";
import colaboratorsRepository from "../../repositories/colaborators/colaborators.js";
import authDTO from "../../dtos/auth/index.js";
import config from "../../config/index.js";
import { ForbiddenError, NotFoundError, UnauthorizedError } from "../../utils/errors/index.js";
import { messages } from "../../utils/constants/index.js";
import verifyPermissions from "../../utils/permissions/verifyChatPermissions.js";
import { daysToSeconds, minutesToSeconds } from "../../utils/time/converters.js";

/**
 * Authenticates a user by user email and password
 * @param {{email:string, password:string}} credentials The object containing the user credentials
 * @returns The access token DTO object (first element in the array) and the refresh token as a string (second element in the array).
 */
const authenticate = async (credentials) => {
    const user = await usersRepository.getByEmail(credentials.email);

    // Check if the user exists
    if (!user) {
        throw new UnauthorizedError(messages.errors.auth.INVALID_CREDENTIALS);
    }
    // Check if the user is verified
    if (!user.verified) {
        throw new UnauthorizedError(messages.errors.auth.NON_VERIFIED);
    }

    // Check that the passwords match
    const passMatches = await bcrypt.compare(credentials.password, user.password.content);
    if (!passMatches) {
        throw new UnauthorizedError(messages.errors.auth.INVALID_CREDENTIALS);
    }

    // Sign cookies and return them
    const accessToken = jwtUtils.sign({ _id: user._id.toString() }, config.jwt.accessTokenSecret, {
        expiresIn: minutesToSeconds(config.jwt.accessTokenMinDuration),
    });
    const refreshToken = jwtUtils.sign({ _id: user._id.toString() }, config.jwt.refreshTokenSecret, {
        expiresIn: daysToSeconds(config.jwt.refreshTokenDaysDuration),
    });

    return [authDTO.toAccessTokenDTO(accessToken), refreshToken];
};

/**
 * UnAuthenticates (logs out) a user by their refresh token
 * 
 * NOTE: Currently it only checks for the token existence and could be done in controller level.
 * However, since this could change and add more business logic
 * this service layer function is defined
 * @param {String} refreshToken The refresh token that identifies the user that is logging off
 * @throws {UnauthorizedError} If the refresh token is non existent
 */
const unauthenticate = async (refreshToken) => {
    // If no refresh token has been provided then there is no point on calling this endpoint
    if (!refreshToken) {
        throw new UnauthorizedError(messages.errors.auth.NO_REFRESH_TOKEN);
    }
}

/**
 * Authorizes a user to do some action in a chat
 *
 * NOTE: If the user is the owner of the chat then no actions are checked. They are allowed full access.
 * @param {string} chatId Id of the chat where the request is being made
 * @param {string} userId Id of the user where that is making the request
 * @param {Array.<string>} requiredActions Array of the actions that are needed to commit the action
 * @returns The found collaborator instance
 */
const authorizeCollaboratorToChat = async (chatId, userId, requiredActions) => {
    const colaboratorInstance = await colaboratorsRepository.getByChatAndUser(chatId, userId);

    // Check if the chat exists for the user
    if (!colaboratorInstance) {
        throw new NotFoundError(messages.errors.ROUTE_NOT_FOUND);
    }

    // Verify permissions and ownership
    const hasAccess = verifyPermissions(
        requiredActions,
        colaboratorInstance.permissions,
        colaboratorInstance.chat.owner._id.toString() === colaboratorInstance.user._id.toString()
    );

    if (!hasAccess) {
        throw new ForbiddenError(messages.errors.auth.FORBIDDEN);
    }

    return colaboratorInstance;
};

export default { authorizeCollaboratorToChat, authenticate, unauthenticate };
