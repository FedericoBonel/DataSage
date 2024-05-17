import expressValidator from "express-validator";
import checkValidator from "../utils/checkValidation.js";
import { validation, messages } from "../../../utils/constants/index.js";

/**
 * Creates a set of middlewares to validate profile update and user registration payloads.
 * @param optionalFields Fields that could be optional, by default none are.
 * @returns The middleware that verifies the payload against the accepted schema.
 */
const createInputBodyValidator = (
    optionalFields = {
        names: false,
        lastnames: false,
        email: false,
        password: false,
    }
) => [
    expressValidator.checkExact(
        expressValidator.checkSchema(
            {
                names: {
                    optional: optionalFields.names,
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
                    optional: optionalFields.lastnames,
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
                    optional: optionalFields.email,
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
                    optional: optionalFields.password,
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

export default createInputBodyValidator;
