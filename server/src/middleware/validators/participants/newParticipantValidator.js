import createInputBodyValidator from "./createInputBodyValidator.js";

/**
 * @openapi
 * components:
 *   schemas:
 *     NewParticipantSchema:
 *       type: object
 *       required:
 *         - email
 *         - permissions
 *       properties:
 *         email:
 *           description: Email of the user to be invited to the chat as a participant
 *           type: string
 *           format: email
 *         permissions:
 *           description: Array of permissions to be assigned to the new participant in the chat. It has to contain the permissions names.
 *           type: array
 *           items:
 *             type: string
 *             example: "read_docs"
 */

/**
 * Middleware that validates request payload fields for new participants
 */
const newParticipantValidator = [...createInputBodyValidator()];

export default newParticipantValidator;
