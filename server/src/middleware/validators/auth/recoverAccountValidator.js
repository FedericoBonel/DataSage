import expressValidator from "express-validator";
import checkValidator from "../utils/checkValidation.js";
import { validation, messages } from "../../../utils/constants/index.js";

/**
 * @openapi
 * components:
 *   schemas:
 *     RecoverAccountSchema:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           description: The email of the user that is requesting to recover their account
 *           type: string
 *           format: email
 */

/**
 * Middleware that validates request payload fields for user recovery account requests
 */
const recoverAccountValidator = [
    expressValidator.checkExact(
        expressValidator.checkSchema(
            {
                recoveryLink: {
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
    expressValidator.checkExact(
        expressValidator.checkSchema({
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
        })
    ),
    checkValidator,
];

export default recoverAccountValidator;
