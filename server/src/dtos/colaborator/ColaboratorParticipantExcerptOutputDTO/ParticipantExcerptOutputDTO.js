import EntityDTO from "../../utils/EntityDTO.js";

/**
 * @openapi
 * components:
 *   schemas:
 *     ParticipantExcerptOutputDTO:
 *       description: This is how participant data will be formatted and exposed to the web for you to use in a summarized manner.
 *       allOf:
 *         - $ref: '#/components/schemas/EntityDTO'
 *         - type: Object
 *           required:
 *             - names
 *             - lastnames
 *             - email
 *             - hasJoined
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
 */
export default class ParticipantExcerptOutputDTO extends EntityDTO {
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
}
