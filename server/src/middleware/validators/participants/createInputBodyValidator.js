import expressValidator from "express-validator";
import checkValidator from "../utils/checkValidation.js";
import { validation, messages } from "../../../utils/constants/index.js";

/**
 * Creates a set of middlewares to validate participant creation and update payloads.
 * @param optionalFields Fields that could be optional, by default none are.
 * @returns The middleware that verifies the payload against the accepted schema.
 */
const createInputBodyValidator = (
    optionalFields = {
        email: false,
        permissions: false,
    }
) => [
    expressValidator.checkSchema(
        {
            _id: {
                exists: {
                    negated: true,
                    errorMessage: messages.errors.validation.ID_PROVIDED,
                },
            },
            email: {
                optional: optionalFields.email,
                isEmail: {
                    errorMessage: messages.errors.validation.user.email.INVALID,
                    bail: true,
                },
                isLength: {
                    options: {
                        min: validation.user.email.MIN_LENGTH,
                        max: validation.user.email.MAX_LENGTH,
                    },
                    errorMessage: messages.errors.validation.user.email.INVALID,
                },
            },
            permissions: {
                optional: optionalFields.permissions,
                isArray: {
                    options: { max: validation.colaborator.permissions.MAX_AMOUNT },
                    errorMessage: messages.errors.validation.colaborator.permissions.INVALID_AMOUNT,
                    bail: true,
                },
                custom: {
                    options: (permissions) =>
                        permissions.every(
                            (permission) =>
                                typeof permission === "string" &&
                                permission.length >= validation.permissions.allowedActions.MIN_LENGTH &&
                                permission.length <= validation.permissions.allowedActions.MAX_LENGTH
                        ),
                    errorMessage: messages.errors.validation.permissions.allowedAction.INVALID_LENGTH,
                },
            },
        },
        ["body"]
    ),
    checkValidator,
];

export default createInputBodyValidator;
