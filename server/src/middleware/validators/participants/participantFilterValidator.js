import checkValidator from "../utils/checkValidation.js";
import paginatedSearchValidators from "../utils/lists/paginatedSearchValidators.js";
import textSearchValidators from "../utils/lists/textSearchValidators.js";

/** Validates query params for participant listing endpoints */
const participantFilterValidator = [...textSearchValidators, ...paginatedSearchValidators, checkValidator];

export default participantFilterValidator;
