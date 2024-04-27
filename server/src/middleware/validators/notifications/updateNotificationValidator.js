import createInputBodyValidator from "./createInputBodyValidator.js";

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateNotificationSchema:
 *       type: object
 *       required:
 *         - isRead
 *       properties:
 *         isRead:
 *           description: The read status of the notification. If true, it means that user has already seen this notification.
 *           type: boolean
 *           example: true
 */

/**
 * Middleware that validates request payload fields for updates in user notifications
 */
const updateNotificationValidator = [...createInputBodyValidator()];

export default updateNotificationValidator;
