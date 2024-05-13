import EntityDTO from "../../utils/EntityDTO.js";

/**
 * @openapi
 * components:
 *   schemas:
 *     ChatPermissionDTO:
 *       description: This is how chat permissions data will be formatted and exposed to the web for you to use in a detailed manner.
 *       allOf:
 *         - $ref: '#/components/schemas/EntityDTO'
 *         - type: Object
 *           required:
 *             - allowedAction
 *           properties:
 *             allowedAction:
 *               type: string
 *               description: Action that is being permitted in the chat.
 *               example: read_docs
 */
export default class ChatPermissionDTO extends EntityDTO {
    /**
     * Allowed action in the chat
     * @type {String}
     */
    allowedAction;
}