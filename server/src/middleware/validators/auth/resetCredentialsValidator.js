import expressValidator from "express-validator";
import checkValidator from "../utils/checkValidation.js";
import { validation, messages } from "../../../utils/constants/index.js";

/**
 * @openapi
 * components:
 *   schemas:
 *     ResetCredentialsSchema:
 *       type: object
 *       required:
 *         - password
 *       properties:
 *         password:
 *           description: The new password to be assigned to the user with the recoveryCode being sent with this payload
 *           type: string
 *           format: email
 */

/**
 * Middleware that validates request payload fields for user password resetting requests in a recovery workflow
 */
const resetCredentialsValidator = [
    expressValidator.checkExact(
        expressValidator.checkSchema(
            {
                recoveryCode: {
                    optional: false,
                    isString: {
                        errorMessage: messages.errors.validation.user.recoveryCode.INVALID,
                        bail: true,
                    },
                    isLength: {
                        options: {
                            min: validation.auth.recoveryCode.MIN_LENGTH,
                            max: validation.auth.recoveryCode.MAX_LENGTH,
                        },
                        errorMessage: messages.errors.validation.user.recoveryCode.INVALID,
                        bail: true,
                    },
                },
            },
            ["query"]
        )
    ),
    expressValidator.checkExact(
        expressValidator.checkSchema({
            password: {
                optional: false,
                isStrongPassword: {
                    errorMessage: messages.errors.validation.user.password.INVALID,
                    bail: true,
                },
                isLength: {
                    options: {
                        min: validation.user.password.MIN_LENGTH,
                        max: validation.user.password.MAX_LENGTH,
                    },
                    errorMessage: messages.errors.validation.user.password.INVALID,
                    bail: true,
                },
            },
        })
    ),
    checkValidator,
];

export default resetCredentialsValidator;
