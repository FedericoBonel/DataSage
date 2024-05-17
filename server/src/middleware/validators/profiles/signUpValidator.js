import expressValidator from "express-validator";
import { validation, messages } from "../../../utils/constants/index.js";
import createInputBodyValidator from "./createInputBodyValidator.js";

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
    ...createInputBodyValidator(),
];

export default signUpValidator;
