import { Router } from "express";
import participationsController from "../controllers/participations.js";

const participationRouter = Router({ mergeParams: true });

/**
 * @openapi
 * tags:
 *   name: Chat Participation
 *   description: API used to manage participation of a user in a chat.
 */
participationRouter
    .route("/")
    /**
     * @openapi
     * /chats/{chatId}/participants/participation:
     *   post:
     *     tags: [Chat Participation]
     *     summary: Accepts an invitation for the logged in user to a chat.
     *     description: Accepts an invitation for the logged in user to a chat. It can be used to join a chat the user has been invited to to start having conversations with it. Once the user accepts the invitation, they will see it in the chat listing resource.
     *     parameters:
     *       - in: path
     *         name: chatId
     *         description: Id of the chat from which to accept the invitation and join.
     *         example: 65154ed674410acd535bc0d3
     *         schema:
     *           type: string
     *     responses:
     *       201:
     *         description: The user has successfully accepted the chat invitation and the chat information is returned.
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
     *                       $ref: "#/components/schemas/ChatDetailsOutputDTO"
     *       400:
     *         $ref: '#/components/responses/400Response'
     *       404:
     *         $ref: '#/components/responses/404Response'
     */
    .post(participationsController.create);

export default participationRouter;
