import EntityDTO from "../../utils/EntityDTO.js";

/**
 * @openapi
 * components:
 *   schemas:
 *     ChatOutputDTO:
 *       description: This is how chat data will be formatted and exposed to the web for you to use.
 *       allOf:
 *         - $ref: '#/components/schemas/EntityDTO'
 *         - type: Object
 *           required:
 *             - name
 *             - owner
 *             - isOwner
 *           properties:
 *             name:
 *               type: string
 *               description: Name of the chat.
 *               example: Math 101 Student assistant.
 *             isOwner:
 *               type: boolean
 *               description: True if the user that is requesting the resource is the owner of the resource.
 *               example: true
 *             owner:
 *               $ref: "#/components/schemas/OwnerOutputDTO"
 */
export default class ChatOutputDTO extends EntityDTO {
    /**
     * Name of the chat
     * @type {String}
     */
    name;

    /**
     * If the user that is requesting the resource is its owner or not
     * @type {Boolean}
     */
    isOwner;

    /**
     * Creator and owner of this chat
     * @type {OwnerOutputDTO}
     */
    owner;
}
