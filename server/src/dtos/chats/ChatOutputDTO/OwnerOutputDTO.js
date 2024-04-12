import EntityDTO from "../../utils/EntityDTO.js";

/**
 * @openapi
 * components:
 *   schemas:
 *     OwnerOutputDTO:
 *       description: Chat owner data formatting.
 *       allOf:
 *         - $ref: '#/components/schemas/EntityDTO'
 *         - type: Object
 *           required:
 *             - names
 *             - lastnames
 *           properties:
 *             names:
 *               type: string
 *               description: Names and middle names of the chat owner.
 *               example: John Alexander
 *             lastnames:
 *               type: string
 *               description: Last names of the chat owner.
 *               example: Smith Sabattini
 */
export default class OwnerOutputDTO extends EntityDTO {
    /**
     * First and middle names of the owner
     * @type {String}
     */
    names;

    /**
     * Last names of the owner
     * @type {String}
     */
    lastnames;
};
