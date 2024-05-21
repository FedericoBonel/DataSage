import expressValidator from "express-validator";
import { validation, messages } from "../../../utils/constants/index.js";
import checkValidator from "../utils/checkValidation.js";

const bodyValidator = expressValidator.checkExact(
    expressValidator.checkSchema({
        names: {
            optional: false,
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
            optional: false,
            isString: {
                errorMessage: messages.errors.validation.user.lastnames.INVALID_LENGTH,
                bail: true,
            },
            isLength: {
                options: {
                    min: validation.user.lastnames.MIN_LENGTH,
                    max: validation.user.lastnames.MAX_LENGTH,
                },
                errorMessage: messages.errors.validation.user.lastnames.INVALID_LENGTH,
                bail: true,
            },
            toLowerCase: true,
        },
        email: {
            optional: false,
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
            optional: false,
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
    })
);

/**
 * @openapi
 * components:
 *   schemas:
 *     SignUpSchema:
 *       type: object
 *       required:
 *         - names
 *         - lastnames
 *         - email
 *         - password
 *       properties:
 *         names:
 *           description: The new user names.
 *           type: string
 *           example: John
 *         lastnames:
 *           description: The new user lastnames.
 *           type: string
 *           example: Alexander
 *         email:
 *           description: The new user email.
 *           type: string
 *           format: email
 *         password:
 *           description: The new user password.
 *           type: string
 *           example: stR0nG#$-1_Pass
 */

/**
 * Middleware that validates request payload fields for login requests
 */
const signUpValidator = [
    expressValidator.checkExact(
        expressValidator.checkSchema(
            {
                verificationLink: {
                    optional: false,
                    isURL: {
                        options: { require_tld: false, require_protocol: true, allow_query_components: false },
                        errorMessage: messages.errors.validation.INVALID_URL,
                        bail: true,
                    },
                    isLength: {
                        options: {
                            max: validation.auth.verificationUrl.MAX_LENGTH,
                        },
                        errorMessage: messages.errors.validation.INVALID_URL,
                        bail: true,
                    },
                    toLowerCase: true,
                },
            },
            ["query"]
        )
    ),
    bodyValidator,
    checkValidator,
];

export default signUpValidator;
