/**
 * @openapi
 * components:
 *   schemas:
 *     NotificationCountDTO:
 *       description: This is how the total amount of not read notifications will be formatted and exposed to the web for you to use.
 *       type: Object
 *       required:
 *         - notReadCount
 *       properties:
 *         notReadCount:
 *           type: integer
 *           description: Amount of notifications that have not been read by the logged in user.
 *           example: 10
 */
export default class NotificationCountDTO {
    /**
     * Amount of notifications that have not been read by the logged in user
     */
    notReadCount;
}
