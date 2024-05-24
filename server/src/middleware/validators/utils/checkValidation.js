import expressValidator from "express-validator";

import { BadRequestError } from "../../../utils/errors/index.js";
import { messages } from "../../../utils/constants/index.js";

/**
 * Verifies the validation executed by express-validator, if any error is detected a BadRequestError is thrown.
 */
const checkValidation = async (req, res, next) => {
    const validationResult = expressValidator.validationResult(req);

    if (!validationResult.isEmpty()) {
        throw new BadRequestError(
            messages.errors.validation.BODY_VALIDATION_FAILED,
            validationResult.array().map((err) => ({
                msg: err.msg,
                errorField: err.param || err.path,
                location: err.location,
            }))
        );
    }

    next();
};

export default checkValidation;
