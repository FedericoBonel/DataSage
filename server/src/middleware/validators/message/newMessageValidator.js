import createInputBodyValidator from "./createInputBodyValidator.js";

/**
 * @openapi
 * components:
 *   schemas:
 *     NewMessageSchema:
 *       type: object
 *       required:
 *         - content
 *       properties:
 *         content:
 *           description: The message to be sent to the AI.
 *           type: string
 */

/**
 * Middleware that validates request payload fields for new chat messages
 */
const newMessageValidator = [...createInputBodyValidator()];

export default newMessageValidator;
