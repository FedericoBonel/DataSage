import { Router } from "express";
import authController from "../controllers/auth.js";
import authValidators from "../middleware/validators/auth/index.js";
import profilesValidators from "../middleware/validators/profiles/index.js";
import { routes } from "../utils/constants/index.js";

const authRouter = Router();

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

authRouter
    .route(`/${routes.auth.REFRESH}`)
    /**
     * @openapi
     * /auth/refresh:
     *   get:
     *     tags: [User Authentication and Authorization]
     *     security: [{cookieAuth: []}]
     *     summary: Refreshes a user access token and returns it.
     *     description: Refreshes a user access token based on the user refresh token and returns it.
     *                  <br />This endpoint should be used with the HTTP Only cookie that contains the refresh token (the cookie will be automatically appended to every request once you authenticate so you shouldn't need to do anything to send it), if the refresh token is still valid, then a new access token will be returned.
     *                  <br />This normally should be used when the previous access token expired and, in a client, it should be implemented in a way that it is transparent for the final user (i.g. if using axios use response interceptors).
     *                  <br />If the refresh token is invalid, it means the user session has reached its time limit and a new authentication with user credentials should be done by the final user, so in that case a 401 response will be returned and the client should redirect the user to the login page.
     *     responses:
     *       200:
     *         description: The user has successfully refreshed the access token and the new access token is returned in the response body.
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
     *       401:
     *         description: The refresh token appended to the request is not present or invalid. A new authentication with user credentials should be done to get a new access token by using the login endpoint.
     *         $ref: '#/components/responses/401Response'
     */
    .get(authController.refresh);

authRouter
    .route(`/${routes.auth.SIGNUP}`)
    /**
     * @openapi
     * /auth/signup:
     *   post:
     *     tags: [User Authentication and Authorization]
     *     security: []
     *     summary: Registers a new user and returns its public information.
     *     description: Registers a new user, sends a verification email to their email and returns its public information.
     *                  The user will be unverified by default and will need to verify their account by following the instructions sent to their email (for more information look at the verify endpoint).
     *                  <br />This endpoint could be used in the registration page in a client.
     *     parameters:
     *       - in: query
     *         name: verificationLink
     *         required: true
     *         description: The link to be sent to the user in the verification email. This link will get appended a query param with the name "verificationCode" that will contain the verification code to be sent to the verification endpoint exposed in this API.
     *                      <br />The link you provide should link the user to the verification page in your client where you will extract the "verificationCode" and request the verification endpoint exposed in this API with it.
     *         schema:
     *           type: string
     *           example: https://myclient.com/auth/verify
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/SignUpSchema'
     *     responses:
     *       201:
     *         description: The user has been successfuly registered and its public information is returned.
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
     *                       $ref: "#/components/schemas/ProfileDTO"
     *       400:
     *         $ref: '#/components/responses/400Response'
     */
    .post(profilesValidators.signUpValidator, authController.signup);

authRouter
    .route(`/${routes.auth.VERIFY}`)
    /**
     * @openapi
     * /auth/verify:
     *   post:
     *     tags: [User Authentication and Authorization]
     *     security: []
     *     summary: Verifies a user account and returns its public information.
     *     description: Verifies a user account and returns its public information.
     *                  When a user signs up using the sign up resource exposed in this API they will receive an email with a link to the verification link you have provided to the sign up resource.
     *                  The link you provide will get injected a query parameter called "verificationCode", you should extract this parameter in the page you link in the sign up resource and provide it to this endpoint to verify the users account.
     *                  <br />Therefore this endpoint should be used in the verification page you link the user to from the signup resource.
     *     parameters:
     *       - in: query
     *         name: verificationCode
     *         required: true
     *         description: The verification code the user received in their email. You should extract this code from the query parameter "verificationCode" appended to whatever link you provided in the signup resource and send it here.
     *         schema:
     *           type: string
     *           example: code123412314-12!3789SKJDL$)8-18927.
     *     responses:
     *       200:
     *         description: The user has been successfuly verified and its public information is returned. After doing this the user can log in the system.
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
     *                       $ref: "#/components/schemas/ProfileDTO"
     *       400:
     *         $ref: '#/components/responses/400Response'
     *       404:
     *         $ref: '#/components/responses/400Response'
     */
    .post(authValidators.userVerificationValidator, authController.verify);

authRouter
    .route(`/${routes.auth.RECOVER}`)
    /**
     * @openapi
     * /auth/recover:
     *   post:
     *     tags: [User Authentication and Authorization]
     *     security: []
     *     summary: Generates an account recovery email for the user and sends it to their registered email so that they can recover access to their account.
     *     description: Generates an account recovery email for the user and sends it to their registered email so that they can recover access to their account.
     *                  The user, could forget their password, and if they do you could provide the user a page so that they can invoke this resource and receive a password recovery email.
     *                  <br />This resource will generate a user recovery code and append it to the link you provide. Therefore, you should extract it in the page you are linking to and send it to the password reset endpoint exposed in this API.
     *     parameters:
     *       - in: query
     *         name: recoveryLink
     *         required: true
     *         description: The link to be sent to the user in the recovery email. This link will get appended a query param with the name "recoveryCode" that will contain the account recovery code to be sent to the password reset endpoint exposed in this API.
     *                      <br />The link you provide should link the user to the password resetting page in your client where you will extract the "recoveryCode" and request the password reset endpoint exposed in this API with it.
     *         schema:
     *           type: string
     *           example: https://myclient.com/auth/recover
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/RecoverAccountSchema'
     *     responses:
     *       200:
     *         description: The request has been processed successfully and IF a user with that email exists an email will be sent to them.
     *                      <br />If a user with that email does not exist, then an email won't be sent and the response will still be 200. This is done this way to avoid exposing credentials to attackers.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/SuccessApiPayload'
     *       400:
     *         $ref: '#/components/responses/400Response'
     */
    .post(authValidators.recoverAccountValidator, authController.recover);

authRouter
    .route(`/${routes.auth.RECOVER}/${routes.auth.CREDENTIALS}`)
    /**
     * @openapi
     * /auth/recover/credentials:
     *   post:
     *     tags: [User Authentication and Authorization]
     *     security: []
     *     summary: Resets a user password from a recovery code previously generated in the recover endpoint exposed in this API.
     *     description: Resets a user password from a recovery code previously generated in the recover endpoint exposed in this API.
     *                  This endpoint should be used in a client to allow a user, that previously invoked the recover endpoint, to use the "recoveryCode" sent to their email as link to reset their password and recover access to their account.
     *                  Therefore, in your client's password resetting page where you would use this endpoint, you should get the "recoveryCode" query parameter and send it together with the new password.
     *                  <br />Completing this action will invalidate all the previously generated access and refresh tokens for that user and require re authentication with the new password.
     *     parameters:
     *       - in: query
     *         name: recoveryCode
     *         required: true
     *         description: The recovery code the user received in their email. You should extract this code from the query parameter "recoveryCode" appended to whatever link you provided in the recover resource and send it here.
     *         schema:
     *           type: string
     *           example: $0!-rAndom_C0de1231
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/ResetCredentialsSchema'
     *     responses:
     *       200:
     *         description: The user password has been updated successfully and all previously generated tokens are now invalid.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/SuccessApiPayload'
     *       400:
     *         $ref: '#/components/responses/400Response'
     *       404:
     *         $ref: '#/components/responses/404Response'
     */
    .post(authValidators.resetCredentialsValidator, authController.resetCredentials);

export default authRouter;
