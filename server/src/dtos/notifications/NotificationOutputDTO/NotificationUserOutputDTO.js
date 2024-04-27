import EntityDTO from "../../utils/EntityDTO.js";

/**
 * @openapi
 * components:
 *   schemas:
 *     NotificationUserOutputDTO:
 *       description: This is how user notification data will be formatted and exposed to the web for you to use.
 *       allOf:
 *         - $ref: '#/components/schemas/EntityDTO'
 *         - type: Object
 *           required:
 *             - names
 *             - lastnames
 *           properties:
 *             names:
 *               description: The names of the sender.
 *               example: Lorenzo
 *             lastnames:
 *               description: The lastnames of the sender.
 *               example: Martini
 */
export default class NotificationUserOutputDTO extends EntityDTO {
    /**
     * The names of the sender of the notification
     * @type {Object}
     */
    names;

    /**
     * The last names of the sender of the notification
     * @type {string}
     */
    lastnames;
}