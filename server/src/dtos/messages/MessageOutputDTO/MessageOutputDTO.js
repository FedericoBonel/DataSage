import EntityDTO from "../../utils/EntityDTO.js";

/**
 * @openapi
 * components:
 *   schemas:
 *     MessageOutputDTO:
 *       description: This is how chat message data will be formatted and exposed to the web for you to use.
 *       allOf:
 *         - $ref: '#/components/schemas/EntityDTO'
 *         - type: Object
 *           required:
 *             - from
 *             - to
 *             - content
 *           properties:
 *             from:
 *               type: string
 *               description: The sender of the message.
 *               example: AI
 *             to:
 *               type: string
 *               description: The receipent of the message.
 *               example: Human
 *             content:
 *               type: string
 *               description: The content of the message.
 *               example: Hello human! How are you today?
 *             sources:
 *               type: array
 *               description: Array with all the document sources used by the AI to generate a message. Will only be available when the message comes from AI.
 *               items:
 *                 $ref: '#/components/schemas/MessageSourceOutputDTO'
 */
export default class MessageOutputDTO extends EntityDTO {
    /**
     * The sender of the message
     * @type {string}
     */
    from;

    /**
     * The receipent of the message
     * @type {string}
     */
    to;

    /**
     * The content of the message
     * @type {string}
     */
    content;

    /**
     * Array with all the document sources used by the AI to generate a message. Will only be available when the message comes from AI.
     * @type {Array.<object>}
     */
    sources;
}