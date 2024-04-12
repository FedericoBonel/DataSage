import createInputBodyValidator from "./createInputBodyValidator.js";

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateChatSchema:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 */

/**
 * Middleware that validates request payload fields for new chats
 */
const updateChatValidator = [...createInputBodyValidator()];

export default updateChatValidator;
