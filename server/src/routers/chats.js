import { Router } from "express";
import { documentUploadValidator } from "../middleware/validators/documents/index.js";
import chatValidators from "../middleware/validators/chats/index.js";
import chatsController from "../controllers/chats.js";
import { validation } from "../utils/constants/index.js";
import chatDTO from "../dtos/chats/index.js";

const chatsRouter = Router();

/**
 * @openapi
 * tags:
 *   name: Chats
 *   description: API used to manage the systems chats
 */
chatsRouter
    .route("/")
    /**
     * @openapi
     * /chats:
     *   post:
     *     tags: [Chats]
     *     summary: Creates a new chat to solve question answering problems about a set of documents.
     *     description: Creates a new chat in the system from a set of documents in PDF. It's used to create new chats that you can then ask questions about the documents content in natural language.
     *     requestBody:
     *       required: true
     *       content:
     *         multipart/form-data:
     *           schema:
     *             type: object
     *             required:
     *               - name
     *             properties:
     *               name:
     *                 type: string
     *               documents:
     *                 type: array
     *                 items:
     *                   type: string
     *                   format: binary
     *     responses:
     *       201:
     *         description: Returns the new chat.
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
     *                       $ref: '#/components/schemas/ChatOutputDTO'
     *       400:
     *         $ref: '#/components/responses/400Response'
     */
    .post(
        documentUploadValidator(chatDTO.DOCS_INPUT_KEY, {
            limits: {
                fileSize: validation.document.size.MAX_BYTES,
                filesPerField: validation.chat.documents.MAX_AMOUNT,
                validExtensions: validation.document.extensions,
                fields: 1,
            },
        }),
        chatValidators.newChatValidator,
        chatsController.create
    );

export default chatsRouter;
