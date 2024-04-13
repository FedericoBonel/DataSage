import { Router } from "express";
import { chatPermissionsValidator } from "../middleware/auth/chats/index.js";
import documentsController from "../controllers/documents.js";
import { permissions } from "../utils/constants/index.js";

const documentsRouter = Router({ mergeParams: true });

/**
 * @openapi
 * tags:
 *   name: Documents
 *   description: API used to manage the documents uploaded to a chat. These contain the chat knowledge base.
 */
documentsRouter
    .route("/")
    /**
     * @openapi
     * /chats/{chatId}/documents:
     *   get:
     *     tags: [Documents]
     *     summary: Gets the list of documents for a chat.
     *     description: Gets the list of all documents for a chat. It can be used to access the documents and display them when a user opens a chat. The user should have access to the documents, if they don't the request will fail.
     *     parameters:
     *       - in: path
     *         name: chatId
     *         description: Id of the chat to retrieve the document list from.
     *         example: 65154ed674410acd535bc0d3
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Returns a list with all the documents for that specific chat.
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
     *                         $ref: '#/components/schemas/DocumentOutputDTO'
     *       400:
     *         $ref: '#/components/responses/400Response'
     *       403:
     *         $ref: '#/components/responses/403Response'
     *       404:
     *         $ref: '#/components/responses/404Response'
     */
    .get(chatPermissionsValidator([permissions.colaborator.readDocs]), documentsController.getByChatId);

export default documentsRouter;
