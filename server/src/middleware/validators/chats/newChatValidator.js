import createInputBodyValidator from "./createInputBodyValidator.js";

/**
 * @openapi
 * components:
 *   schemas:
 *     NewChatSchema:
 *       type: object
 *       required:
 *         - name
 *         - documents
 *       properties:
 *         name:
 *           type: string
 *         documents:
 *           type: array
 *           items:
 *             type: string
 *             format: binary
 */

/**
 * Middleware that validates request payload fields for new chats
 */
const newChatValidator = [...createInputBodyValidator()];

export default newChatValidator;
