import expressValidator from "express-validator";
import checkValidator from "../utils/checkValidation.js";
import { validation, messages } from "../../../utils/constants/index.js";

/**
 * Creates a set of middlewares to validate profile update payloads.
 * @param optionalFields Fields that could be optional, by default none are.
 * @param fieldsToCheck Fields that should be checked in the payload. By default all are.
 * @returns The middleware that verifies the payload against the accepted schema.
 */
const createInputBodyValidator = () => [
    expressValidator.checkExact(
        expressValidator.checkSchema(
            {
                names: {
                    optional: true,
                    isString: {
                        errorMessage: messages.errors.validation.user.names.INVALID_LENGTH,
                        bail: true,
                    },
                    isLength: {
                        options: {
                            min: validation.user.names.MIN_LENGTH,
                            max: validation.user.names.MAX_LENGTH,
                        },
                        errorMessage: messages.errors.validation.user.names.INVALID_LENGTH,
                        bail: true,
                    },
                    toLowerCase: true,
                },
                lastnames: {
                    optional: true,
                    isString: {
                        errorMessage: messages.errors.validation.user.lastnames.INVALID_LENGTH,
                        bail: true,
                    },
                    isLength: {
                        options: {
                            min: validation.user.names.MIN_LENGTH,
                            max: validation.user.names.MAX_LENGTH,
                        },
                        errorMessage: messages.errors.validation.user.lastnames.INVALID_LENGTH,
                        bail: true,
                    },
                    toLowerCase: true,
                },
                email: {
                    optional: true,
                    isEmail: {
                        errorMessage: messages.errors.validation.user.email.INVALID,
                        bail: true,
                    },
                    normalizeEmail: true,
                    isLength: {
                        options: {
                            min: validation.user.email.MIN_LENGTH,
                            max: validation.user.email.MAX_LENGTH,
                        },
                        errorMessage: messages.errors.validation.user.email.INVALID,
                        bail: true,
                    },
                    toLowerCase: true,
                },
                password: {
                    optional: true,
                    isStrongPassword: {
                        bail: true,
                        errorMessage: messages.errors.validation.user.password.INVALID,
                    },
                    isLength: {
                        options: {
                            max: validation.user.password.MAX_LENGTH,
                        },
                        errorMessage: messages.errors.validation.user.password.INVALID,
                        bail: true,
                    },
                },
            },
            ["body"]
        )
    ),
    checkValidator,
];

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateProfileSchema:
 *       type: object
 *       properties:
 *         names:
 *           description: The logged in user names.
 *           type: string
 *           example: John
 *         lastnames:
 *           description: The logged in user lastnames.
 *           type: string
 *           example: Alexander
 *         email:
 *           description: The logged in user email.
 *           type: string
 *           format: email
 *         password:
 *           description: The logged in user password. Changing this will require a new authentication and will invalidate all tokens.
 *           type: string
 *           example: stR0nG#$-1_Pass
 */

/**
 * Middleware that validates request payload fields for login requests
 */
const updateProfileValidator = [...createInputBodyValidator()];

export default updateProfileValidator;
