import expressValidator from "express-validator";
import checkValidator from "../utils/checkValidation.js";
import { validation, messages } from "../../../utils/constants/index.js";

const updateProfileValidator = [
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
                "credentials.password": {
                    exists: {
                        // Check for password only if credentials are provided
                        if: (value, { req }) =>
                            req.body.credentials || req.body.credentials?.newPassword || req.body.credentials?.newEmail,
                        errorMessage: messages.errors.validation.user.credentialsUpdate.INVALID_PASSWORD,
                        bail: true,
                    },
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
                "credentials.newEmail": {
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
                "credentials.newPassword": {
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
 *         credentials:
 *           type: object
 *           description: The object with new credentials to be assigned to the logged in user
 *           required:
 *             - password
 *           properties:
 *             newEmail:
 *               description: The new email to be assigned to the logged in user.
 *               type: string
 *               format: email
 *             newPassword:
 *               description: The new logged in user password. Changing this will require a new authentication and will invalidate all tokens.
 *               example: N3WstR0nG#$-1_Pass
 *             password:
 *               description: The CURRENT logged in user password. You need to provide this whenever you provide a new password or a new email.
 *               type: string
 *               example: stR0nG#$-1_Pass
 */

export default updateProfileValidator;
