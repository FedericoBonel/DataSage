import createInputBodyValidator from "./createInputBodyValidator.js";

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateProfileSchema:
 *       type: object
 *       properties:
 *         names:
 *           description: The logged in user names.
 *           type: string
 *           example: John
 *         lastnames:
 *           description: The logged in user lastnames.
 *           type: string
 *           example: Alexander
 *         email:
 *           description: The logged in user email.
 *           type: string
 *           format: email
 *         password:
 *           description: The logged in user password. Changing this will require a new authentication and will invalidate all tokens.
 *           type: string
 *           example: stR0nG#$-1_Pass
 */

/**
 * Middleware that validates request payload fields for login requests
 */
const updateProfileValidator = [
    ...createInputBodyValidator({ names: true, lastnames: true, email: true, password: true }),
];

export default updateProfileValidator;
