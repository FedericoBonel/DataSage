import EntityDTO from "../../utils/EntityDTO.js";

/**
 * @openapi
 * components:
 *   schemas:
 *     NotificationOutputDTO:
 *       description: This is how notifications data will be formatted and exposed to the web for you to use.
 *       allOf:
 *         - $ref: '#/components/schemas/EntityUpdatedAtDTO'
 *         - type: Object
 *           required:
 *             - from
 *             - type
 *             - relatedEntity
 *             - isRead
 *           properties:
 *             from:
 *               description: The sender of the notification.
 *               $ref: '#/components/schemas/NotificationUserOutputDTO'
 *             type:
 *               type: string
 *               description: The type of notification.
 *               example: chat_invitation
 *             relatedEntity:
 *               description: The entity to which this notification refers to.
 *               $ref: '#/components/schemas/NotificationRelatedEntityOutputDTO'
 *             isRead:
 *               type: boolean
 *               description: If true the notification has been read already by the logged in user that is requesting the resource, otherwise it hasn't yet.
 *               example: true
 */
export default class NotificationOutputDTO extends EntityDTO {
    /**
     * The sender of the notification
     * @type {Object}
     */
    from;

    /**
     * The type of notification
     * @type {string}
     */
    type;

    /**
     * The entity to which this notification refers to
     * @type {string}
     */
    relatedEntity;

    /**
     * If true the notification has been read by the logged in user that is requesting the resource, otherwise it hasn't yet.
     * @type {boolean}
     */
    isRead;
}