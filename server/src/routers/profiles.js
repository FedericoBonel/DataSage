import { Router } from "express";
import profilesController from "../controllers/profiles.js";

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
    .get(profilesController.get);

export default profileRouter;
