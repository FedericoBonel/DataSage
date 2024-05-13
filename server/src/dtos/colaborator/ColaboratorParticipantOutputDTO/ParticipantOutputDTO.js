import EntityDTO from "../../utils/EntityDTO.js";

/**
 * @openapi
 * components:
 *   schemas:
 *     ParticipantDetailsOutputDTO:
 *       description: This is how participant data will be formatted and exposed to the web for you to use in a detailed manner.
 *       allOf:
 *         - $ref: '#/components/schemas/EntityDTO'
 *         - type: Object
 *           required:
 *             - names
 *             - lastnames
 *             - email
 *             - hasJoined
 *             - permissions
 *           properties:
 *             names:
 *               type: string
 *               description: Names of the participant.
 *               example: Alexander
 *             lastnames:
 *               type: string
 *               description: Last names of the participant.
 *               example: Gomez Perez
 *             email:
 *               type: string
 *               format: email
 *               description: Email of the participant.
 *             hasJoined:
 *               type: boolean
 *               description: True if the participant has accepted to join the chat.
 *               example: true
 *             permissions:
 *               type: array
 *               description: Array of the allowed permissions for this participant in the corresponding chat.
 *               items: 
 *                 $ref: '#/components/schemas/ChatPermissionDTO'
 */
export default class ChatOutputDTO extends EntityDTO {
    /**
     * Names of the participant
     * @type {String}
     */
    names;

    /**
     * Last names of the participant
     * @type {String}
     */
    lastnames;

    /**
     * Email of the participant
     * @type {String}
     */
    email;

    /**
     * True if the participant has accepted to join the chat.
     * @type {Boolean}
     */
    hasJoined;

    /**
     * Array of allowed permissions for this participant in this chat.
     * @type {Array}
     */
    permissions;
}
