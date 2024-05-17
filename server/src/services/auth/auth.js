import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import jwtUtils from "jsonwebtoken";
import usersRepository from "../../repositories/users/users.js";
import colaboratorsRepository from "../../repositories/colaborators/colaborators.js";
import emailsRepository from "../../repositories/emails/emails.js";
import authDTO from "../../dtos/auth/index.js";
import profilesDTO from "../../dtos/profiles/index.js";
import config from "../../config/index.js";
import { BadRequestError, ForbiddenError, NotFoundError, UnauthorizedError } from "../../utils/errors/index.js";
import { messages } from "../../utils/constants/index.js";
import verifyPermissions from "../../utils/permissions/verifyChatPermissions.js";
import { daysToSeconds, minutesToSeconds } from "../../utils/time/converters.js";
import { verifyUserJWT } from "./utils/index.js";

/**
 * Registers a new user and sends their verification email.
 * @param {{names: string, lastnames: string, email: string, password: string}} newUser The user to be registered
 * @param {string} verificationLink The verification link to be sent to the user in the verification email
 * @returns The stored user in database
 */
const register = async (newUser, verificationLink) => {
    // Check that a verified user with the same email does not exist
    const foundUser = await usersRepository.getByEmail(newUser.email);
    if (foundUser) {
        // If the user is verified, throw error, otherwise delete it to override it
        if (foundUser.verified) {
            throw new BadRequestError(messages.errors.validation.user.email.INVALID);
        } else {
            await usersRepository.deleteById(foundUser._id);
        }
    }

    // Encrypt the password and generate the verification code
    const userToSave = { ...newUser };
    userToSave.password = await bcrypt.hash(newUser.password, config.bcrypt.saltRounds);
    userToSave.verificationCode = uuid();

    // Send the verification email
    const savedUser = await usersRepository.save(profilesDTO.toUserModel(userToSave));
    emailsRepository.saveVerificationEmail(verificationLink, newUser, userToSave.verificationCode);

    return profilesDTO.toProfileDTO(savedUser);
};

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
};

/**
 * Validates a user refresh token and generates a new user access token if valid
 * @param {String} receivedRefreshToken The refresh token from the user that is refreshing their access token
 * @returns The new access token
 */
const refreshToken = async (receivedRefreshToken) => {
    // Verify the token
    const user = await verifyUserJWT(receivedRefreshToken, config.jwt.refreshTokenSecret);

    // Sign access token and return it
    const accessToken = jwtUtils.sign({ _id: user._id.toString() }, config.jwt.accessTokenSecret, {
        expiresIn: minutesToSeconds(config.jwt.accessTokenMinDuration),
    });

    return authDTO.toAccessTokenDTO(accessToken);
};

/**
 * Validates a user access token payload and generates and returns the user information if valid
 * @param {String} accessToken The access token to be validated
 * @returns The user the token belongs to and its public information
 */
const validateAccessToken = async (accessToken) => {
    // Verify the token
    const validatedUser = await verifyUserJWT(accessToken, config.jwt.accessTokenSecret);

    // Return the found user
    return authDTO.toReqUser(validatedUser);
};

/**
 * Verifies a user by verification code.
 * @param {String} verificationCode The verification code of the user
 * @returns The verified user information
 */
const verifyUser = async (verificationCode) => {
    // Find the user by verification code
    const foundUser = await usersRepository.getByVerificationCode(verificationCode);
    if (!foundUser) {
        throw new NotFoundError(messages.errors.ROUTE_NOT_FOUND);
    }

    foundUser.verified = true;

    // Update their verification status
    const updatedUser = await usersRepository.updateById(foundUser, foundUser._id);

    return profilesDTO.toProfileDTO(updatedUser);
};

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

export default {
    register,
    authenticate,
    unauthenticate,
    refreshToken,
    validateAccessToken,
    verifyUser,
    authorizeCollaboratorToChat,
};
