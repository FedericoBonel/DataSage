import expressValidator from "express-validator";
import checkValidator from "../utils/checkValidation.js";
import { validation, messages } from "../../../utils/constants/index.js";

/**
 * Middleware that validates request payload fields for user verification requests
 */
const userVerificationValidator = [
    expressValidator.checkExact(
        expressValidator.checkSchema(
            {
                verificationCode: {
                    optional: false,
                    isLength: {
                        options: {
                            min: validation.auth.verificationCode.MIN_LENGTH,
                            max: validation.auth.verificationCode.MAX_LENGTH,
                        },
                        errorMessage: messages.errors.validation.user.verificationCode.INVALID,
                        bail: true,
                    },
                },
            },
            ["query"]
        )
    ),
    checkValidator,
];

export default userVerificationValidator;
