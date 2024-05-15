import expressValidator from "express-validator";
import checkValidator from "../utils/checkValidation.js";
import { validation, messages } from "../../../utils/constants/index.js";

/**
 * Creates a set of middlewares to validate login payloads.
 * @returns The middleware that verifies the payload against the accepted schema.
 */
const createInputBodyValidator = () => [
    expressValidator.checkExact(
        expressValidator.checkSchema(
            {
                email: {
                    optional: false,
                    isEmail: {
                        errorMessage: messages.errors.validation.user.email.INVALID,
                        bail: true,
                    },
                    normalizeEmail: true,
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
 *     AuthLoginSchema:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           description: The email of the user that is logging in
 *           type: string
 *           format: email
 *         password:
 *           description: The password of the user that is logging in
 *           type: string
 *           example: paSord_$1
 */

/**
 * Middleware that validates request payload fields for login requests
 */
const loginBodyValidator = [...createInputBodyValidator()];

export default loginBodyValidator;
