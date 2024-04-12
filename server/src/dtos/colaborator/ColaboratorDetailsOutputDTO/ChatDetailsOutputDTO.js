import EntityDTO from "../../utils/EntityDTO.js";

/**
 * @openapi
 * components:
 *   schemas:
 *     ChatDetailsOutputDTO:
 *       description: This is how chat data will be formatted and exposed to the web for you to use in a detailed manner.
 *       allOf:
 *         - $ref: '#/components/schemas/EntityDTO'
 *         - type: Object
 *           required:
 *             - name
 *             - owner
 *             - isOwner
 *             - hasJoined
 *             - permissions
 *           properties:
 *             name:
 *               type: string
 *               description: Name of the chat.
 *               example: Math 101 Student assistant.
 *             hasJoined:
 *               type: boolean
 *               description: True if the user that is requesting the resource has accepted to join to the chat or if it is its owner.
 *               example: true.
 *             isOwner:
 *               type: boolean
 *               description: True if the user that is requesting the resource is the owner of the resource.
 *               example: true.
 *             permissions:
 *               type: array
 *               description: Array of allowed permissions for this user in this chat. If the user is the owner (isOwner == true) then the user can do anything in the chat and this will be empty.
 *               items: 
 *                 $ref: '#/components/schemas/ChatPermissionDTO'
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
     * Creator and owner of this chat
     * @type {OwnerOutputDTO}
     */
    owner;

    /**
     * True if the user requesting this is the owner of the chat (owner._id == user id)
     * @type {Boolean} 
     */
    isOwner;

    /**
     * True if the user that is requesting the resource has accepted to join to the chat or if it is its owner.
     * @type {Boolean}
     */
    hasJoined;

    /**
     * Array of allowed permissions for this user in this chat. If the user is the owner (isOwner == true) then the user can do anything in the chat and this will be empty.
     * @type {Array}
     */
    permissions;
}
