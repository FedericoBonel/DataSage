import { Router } from "express";
import participantValidator from "../middleware/validators/participants/index.js";
import participantsController from "../controllers/participants.js";

const participantsRouter = Router({ mergeParams: true });

/**
 * @openapi
 * tags:
 *   name: Chat Participants
 *   description: API used to manage users invited to a chat.
 */
participantsRouter
    .route("/")
    /**
     * @openapi
     * /chats/{chatId}/participants:
     *   post:
     *     tags: [Chat Participants]
     *     summary: Invites a new participant to the chat.
     *     description: Invites a user to a chat by the chat id and the user's email. It can be used to share a chat and allow other users to use it.
     *     parameters:
     *       - in: path
     *         name: chatId
     *         description: Id of the chat to which invite the participant to.
     *         example: 65154ed674410acd535bc0d3
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/NewParticipantSchema'
     *     responses:
     *       201:
     *         description: The user has been successfully invited to the chat and the invited participant information is returned.
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
     *                       type: array
     *                       items:
     *                         $ref: '#/components/schemas/ParticipantDetailsOutputDTO'
     *       400:
     *         $ref: '#/components/responses/400Response'
     *       404:
     *         $ref: '#/components/responses/404Response'
     */
    .post(participantValidator.newParticipantValidator, participantsController.create);

export default participantsRouter;
