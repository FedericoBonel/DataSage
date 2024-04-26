import { Router } from "express";
import participantValidator from "../middleware/validators/participants/index.js";
import entityIdValidator from "../middleware/validators/utils/entityIdValidator.js";
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
     *   get:
     *     tags: [Chat Participants]
     *     summary: Gets the list of participants (non owners) of a chat.
     *     description: Gets the list of participants (non owners) of a chat by date of invitation in descending order. It can be used in a client to show the participants of a chat to a chat owner in the participants management menu or similar.
     *     parameters:
     *       - in: path
     *         name: chatId
     *         description: Id of the chat from wich you want to retrieve the participants.
     *         example: 65154ed674410acd535bc0d3
     *         schema:
     *           type: string
     *       - $ref: '#/components/parameters/page'
     *       - $ref: '#/components/parameters/limit'
     *       - $ref: '#/components/parameters/textSearch'
     *     responses:
     *       200:
     *         description: Returns a list with all the chat participants that match the provided search params. The list is always ordered by date of invitation (when the owner invited them) in descending order.
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
     *                         $ref: '#/components/schemas/ParticipantExcerptOutputDTO'
     *       400:
     *         $ref: '#/components/responses/400Response'
     *       404:
     *         $ref: '#/components/responses/404Response'
     */
    .get(participantValidator.participantFilterValidator, participantsController.get)
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
     *                       $ref: "#/components/schemas/ParticipantDetailsOutputDTO"
     *       400:
     *         $ref: '#/components/responses/400Response'
     *       404:
     *         $ref: '#/components/responses/404Response'
     */
    .post(participantValidator.newParticipantValidator, participantsController.create);

participantsRouter
    .route("/:participantId")
    /**
     * @openapi
     * /chats/{chatId}/participants/{participantId}:
     *   delete:
     *     tags: [Chat Participants]
     *     summary: Deletes a participant (non owner) from a chat.
     *     description: Deletes a participant (non owner) from a chat by chat id and participant id. It can be used to allow chat owners to delete invited participants from chats and manage access to their chats.
     *     parameters:
     *       - in: path
     *         name: chatId
     *         description: Id of the chat from wich you want to remove the participant.
     *         example: 65154ed674410acd535bc0d3
     *         schema:
     *           type: string
     *       - in: path
     *         name: participantId
     *         description: Id of the participant to remove from the chat.
     *         example: 65154ed674410acd535bc0d3
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Deletion was successful and the deleted participant is returned.
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
     *                       $ref: "#/components/schemas/ParticipantDetailsOutputDTO"
     *       400:
     *         $ref: '#/components/responses/400Response'
     *       404:
     *         $ref: '#/components/responses/404Response'
     */
    .delete(entityIdValidator("participantId"), participantsController.deleteById);

export default participantsRouter;
