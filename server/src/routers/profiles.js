import { Router } from "express";
import profilesController from "../controllers/profiles.js";
import profileValidators from "../middleware/validators/profiles/index.js";

const profileRouter = Router();

/**
 * @openapi
 * tags:
 *   name: User Profile
 *   description: API used to manage a logged in user profile information.
 */
profileRouter
    .route("")
    /**
     * @openapi
     * /profile:
     *   get:
     *     tags: [User Profile]
     *     summary: Gets the logged in user profile information.
     *     description: Gets the logged in user profile information. This could be used in a client to check if someone is logged in, who is logged in, or to show current user information in a profile settings page.
     *     responses:
     *       200:
     *         description: The request was successful and the user profile information is returned.
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
     *       401:
     *         $ref: '#/components/responses/401Response'
     */
    .get(profilesController.get)
    /**
     * @openapi
     * /profile:
     *   patch:
     *     tags: [User Profile]
     *     summary: Updates the logged in user profile information.
     *     description: Updates the logged in user profile information. This could be used in a client to update a user registered information in something like a profile settings page or similar. If the password is updated all issued tokens will be invalid and a new authentication will be required.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateProfileSchema'
     *     responses:
     *       200:
     *         description: The request was successful and the updated user profile information is returned. If the password was updated all tokens will be invalid and a new authentication will be required.
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
     *       401:
     *         $ref: '#/components/responses/401Response'
     */
    .patch(profileValidators.updateProfileValidator, profilesController.update);

export default profileRouter;
