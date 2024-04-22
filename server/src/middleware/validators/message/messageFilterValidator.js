import checkValidator from "../utils/checkValidation.js";
import paginatedSearchValidators from "../utils/lists/paginatedSearchValidators.js";

/** Validates query params for message listing endpoints */
const messageFilterValidator = [...paginatedSearchValidators, checkValidator];

export default messageFilterValidator;
