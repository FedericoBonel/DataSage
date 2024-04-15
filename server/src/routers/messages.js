import { Router } from "express";
import { newMessageValidator } from "../middleware/validators/message/index.js";
import messagesController from "../controllers/messages.js";

const messagesRouter = Router({ mergeParams: true });

/**
 * @openapi
 * tags:
 *   name: Chat Messages
 *   description: API used to have conversations with the AI and manage all chat messages.
 */
messagesRouter
    .route("/")
    /**
     * @openapi
     * /chats/{chatId}/messages:
     *   post:
     *     tags: [Chat Messages]
     *     summary: Sends a message to the chat.
     *     description: Sends a message to the AI in the specified chat. It can be used to have conversations with the AI.
     *     parameters:
     *       - in: path
     *         name: chatId
     *         description: Id of the chat to send the message to.
     *         example: 65154ed674410acd535bc0d3
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/NewMessageSchema'
     *     responses:
     *       201:
     *         description: The AI has received the message, the message has been registered in the history and the response of the AI to the message is returned.
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
     *                         $ref: '#/components/schemas/MessageOutputDTO'
     *       400:
     *         $ref: '#/components/responses/400Response'
     *       404:
     *         $ref: '#/components/responses/404Response'
     */
    .post(newMessageValidator, messagesController.generateResponse);

export default messagesRouter;
