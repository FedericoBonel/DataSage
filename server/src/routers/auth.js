import { Router } from "express";
import authController from "../controllers/auth.js";
import authValidators from "../middleware/validators/auth/index.js";
import { routes } from "../utils/constants/index.js";

const authRouter = Router({ mergeParams: true });

/**
 * @openapi
 * tags:
 *   name: User Authentication and Authorization
 *   description: API used to manage user authentication and authorization such as registration, login and logout operations.
 */
authRouter
    .route(`/${routes.auth.LOGIN}`)
    /**
     * @openapi
     * /auth/login:
     *   post:
     *     tags: [User Authentication and Authorization]
     *     security: []
     *     summary: Logs a user into the system and returns their access and refresh tokens.
     *     description: Logs a user into the system and returns their access token in the response payload and refresh token in the response cookies.
     *                  <br />This endpoint must be used before all other operations to gain access to the system, in a client this normally would be done in the login screen.
     *                  <br />Once you get the access token, you should include this token in the header Authorization in format 'Bearer "token"' without double quotes to identify the user in every protected request.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/AuthLoginSchema'
     *     responses:
     *       200:
     *         description: The user has successfully logged in and their access token is returned in the payload and their refresh token in the http only cookie "refresh_token".
     *                      <br />You need to provide the users access token for all protected routes and the refresh token to refresh the access token after it has expired.
     *                      <br />The refresh token is an HTTP Only cookie, therefore it will be automatically appended to every subsequent request. For more information on the refresh token check the refresh endpoint documentation.
     *         headers:
     *           Set-Cookie:
     *             description: Sets all cookies required for a session. Currently it only sets the refresh token to be used when refreshing an expired access token.
     *             schema:
     *               type: string
     *               example: refresh_token=theJwtToken; Max-Age=1209600; Path=/; Expires=Tue, 05 Mar 2024 08:48:38 GMT; SameSite=None; Secure; HttpOnly
     *         content:
     *           application/json:
     *             schema:
     *               allOf:
     *                 - $ref: '#/components/schemas/SuccessApiPayload'
     *                 - type: object
     *                   required:
     *                     - data
     *                   properties:
     *                     data:
     *                       $ref: "#/components/schemas/AccessTokenDTO"
     *       400:
     *         $ref: '#/components/responses/400Response'
     *       401:
     *         description: The credentials that were provided in the payload are incorrect or the user account is not verified yet.
     *         $ref: '#/components/responses/401Response'
     */
    .post(authValidators.loginBodyValidator, authController.login);

authRouter
    .route(`/${routes.auth.LOGOUT}`)
    /**
     * @openapi
     * /auth/logout:
     *   post:
     *     tags: [User Authentication and Authorization]
     *     security: [{cookieAuth: []}]
     *     summary: Logs a user out of the system and deletes their refresh token from the browser cookies.
     *     description: Logs a user out of the system and deletes their refresh token from the browser cookies.
     *                  <br />This endpoint should be used when a user stops using the system and decides to finish their session early (before token expiration), in a client this normally would be done in a logout button.
     *                  <br />Once you do this your refresh token will be invalidated. The access token may still be used but because its lifetime is very short it should stop being valid soon after this request.
     *     responses:
     *       200:
     *         description: The user has successfully logged out and a response with a cookie invalidation header for the refresh token is returned.
     *         headers:
     *           Set-Cookie:
     *             description: Removes the refresh token from the cookies.
     *             schema:
     *               type: string
     *               example: refresh_token=nonvalid; Max-Age=-1; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;; SameSite=None; Secure; HttpOnly
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/SuccessApiPayload'
     *       401:
     *         description: The refresh token appended to the request is not present if present but expired then a 200 response is returned with the cookie removal header.
     *         $ref: '#/components/responses/401Response'
     */
    .post(authController.logout);

export default authRouter;
