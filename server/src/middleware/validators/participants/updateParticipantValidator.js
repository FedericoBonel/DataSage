import createInputBodyValidator from "./createInputBodyValidator.js";

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateParticipantSchema:
 *       type: object
 *       required:
 *         - permissions
 *       properties:
 *         permissions:
 *           description: Array of permissions to be assigned to the participant in the chat. It has to contain the permissions names. It replaces all permissions that are currently given to the participant.
 *           type: array
 *           items:
 *             type: string
 *             example: "read_docs"
 */

/**
 * Middleware that validates request payload fields for new participants
 */
const updateParticipantValidator = [...createInputBodyValidator(undefined, { email: false, permissions: true })];

export default updateParticipantValidator;
