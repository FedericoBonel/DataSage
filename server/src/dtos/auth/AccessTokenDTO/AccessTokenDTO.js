/**
 * @openapi
 * components:
 *   schemas:
 *     AccessTokenDTO:
 *       description: This is how access tokens will be exposed and formatted for you to use.
 *       type: Object
 *       required:
 *         - token
 *       properties:
 *         token:
 *           type: string
 *           description: The access token to be used in protected routes.
 *           example: jwtToken1234123412341.128371927381.127838189
 */
export default class AccessTokenDTO {
    /**
     * The access token to be used in protected routes.
     * @type {String}
     */
    token;
}
