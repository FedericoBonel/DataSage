/**
 * @openapi
 * components:
 *   schemas:
 *     NotificationRelatedEntityOutputDTO:
 *       description: This is how entities related to notification will be formatted and exposed to the web for you to use.
 *       type: Object
 *       required:
 *         - _id
 *         - type
 *       properties:
 *         _id:
 *           description: The id of entity this notification refers to. You can use this with the type field to retrieve or redirect the user to the necessary resource.
 *           example: 612c540c4e710faa8b71e15a
 *         type:
 *           description: The type of entity this notification refers to. You can use this with the _id field to retrieve or redirect the user to the necessary resource.
 *           example: chat
 */
export default class NotificationUserOutputDTO {
    /**
     * The id of entity this notification refers to. You can use this with the type field to retrieve or redirect the user to the necessary resource.
     * @type {Object}
     */
    _id;

    /**
     * The type of entity this notification refers to. You can use this with the _id field to retrieve or redirect the user to the necessary resource.
     * @type {Object}
     */
    type;
}