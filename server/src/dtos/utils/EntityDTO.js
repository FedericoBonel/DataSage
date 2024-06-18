/**
 * @openapi
 * components:
 *   schemas:
 *     EntityDTO:
 *       description: Properties that any entity has in the system.
 *       type: Object
 *       required:
 *         - _id
 *       properties:
 *         _id:
 *           type: string
 *           description: Entity unique identifier. Use this to identify the entity in the system.
 *           example: abc1234512314ababba
 *     EntityCreatedAtDTO:
 *       description: Properties that any entity has in the system with createdAt timestamp.
 *       allOf:
 *         - $ref: '#/components/schemas/EntityDTO'
 *         - type: Object
 *           required:
 *             - createdAt
 *           properties:
 *             createdAt:
 *               type: string
 *               format: date-time
 *               description: Date and time when the entity was created/registered.
 *               example: 2023-01-01T06:05:55.000Z
 *     EntityUpdatedAtDTO:
 *       description: Properties that any entity has in the system with updatedAt timestamp.
 *       allOf:
 *         - $ref: '#/components/schemas/EntityCreatedAtDTO'
 *         - type: Object
 *           required:
 *             - updatedAt
 *           properties:
 *             updatedAt:
 *               type: string
 *               format: date-time
 *               description: Date and time when the entity was last updated.
 *               example: 2023-01-01T06:05:55.000Z
 * 
 */
export default class EntityDTO {
    /**
     * Unique ID of the entity
     * @type {String}
     */
    _id;

    /**
     * Date of registration of the entity
     * @type {Date}
     */
    createdAt;

    /**
     * Date of last updated of the entity
     * @type {Date}
     */
    updatedAt;
}