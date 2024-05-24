import EntityDTO from "../../utils/EntityDTO.js"

/**
 * @openapi
 * components:
 *   schemas:
 *     ProfileDTO:
 *       description: This is how a logged in user profile information is formatted and exposed for you to use.
 *       allOf:
 *         - $ref: '#/components/schemas/EntityDTO'
 *         - type: Object
 *           required:
 *             - names
 *             - lastnames
 *             - email
 *             - updatedAt
 *           properties:
 *             names:
 *               type: string
 *               description: The names of the logged in user.
 *               example: john
 *             lastnames:
 *               type: string
 *               description: The lastnames of the logged in user.
 *               example: doe
 *             email:
 *               type: string
 *               description: The email of the logged in user.
 *               example: doe
 *             updatedAt:
 *               type: string
 *               format: date-time
 *               description: The timestamp of the last update in the user information.
 */

/**
 * Class of a user profile information as it should be exposed in the web.
 */
export default class ReqUserDTO extends EntityDTO {
    /**
     * The names of the user
     * @type {String}
     */
    names;

    /**
     * The lastnames of the user
     * @type {String}
     */
    lastnames;

    /**
     * The email of the user
     * @type {String}
     */
    email;

    /**
     * The timestamp of the last update in the user information
     * @type {Date}
     */
    updatedAt;
}