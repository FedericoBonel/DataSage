import { Router } from "express";
import { documentUploadValidator } from "../middleware/validators/documents/index.js";
import entityIdValidator from "../middleware/validators/utils/entityIdValidator.js";
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
     *   get:
     *     tags: [Chats]
     *     summary: Gets the list of chats for the logged in user.
     *     description: Gets the list of chats for the logged in user by date in descending order. It can be used in a client to show the shared chats with the user or the chats created by the user in a list.
     *     parameters:
     *       - $ref: '#/components/parameters/page'
     *       - $ref: '#/components/parameters/limit'
     *       - $ref: '#/components/parameters/ownership'
     *       - $ref: '#/components/parameters/textSearch'
     *     responses:
     *       200:
     *         description: Returns a list with all the chats that match the provided search params. The list is always ordered by date in descending order.
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
     *                         $ref: '#/components/schemas/ChatOutputDTO'
     *       400:
     *         $ref: '#/components/responses/400Response'
     *       401:
     *         $ref: '#/components/responses/401Response'
     *       403:
     *         $ref: '#/components/responses/403Response'
     */
    .get(chatValidators.chatFilterValidator, chatsController.get)
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
     *             $ref: '#/components/schemas/NewChatSchema'
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

chatsRouter
    .route("/:chatId")
    /**
     * @openapi
     * /chats/{chatId}:
     *   get:
     *     tags: [Chats]
     *     summary: Obtains a chat by id.
     *     description: Retrieves a chat by its id. Can be used to show more details about a chat and get a user's permissions in a chat.
     *     parameters:
     *       - in: path
     *         name: chatId
     *         description: Id of the chat to be retrieved.
     *         example: 65154ed674410acd535bc0d3
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Returns the chat with that id.
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
     *                       $ref: '#/components/schemas/ChatDetailsOutputDTO'
     *       400:
     *         $ref: '#/components/responses/400Response'
     *       404:
     *         $ref: '#/components/responses/404Response'
     */
    .get(entityIdValidator("chatId"), chatsController.getById)
    /**
     * @openapi
     * /chats/{chatId}:
     *   put:
     *     tags: [Chats]
     *     summary: Updates a chat by id.
     *     description: Updates a chat by id. It's used to update chat metadata like its name or other related information. To upload documents use the other resources.
     *     parameters:
     *       - in: path
     *         name: chatId
     *         description: Id of the chat to be updated.
     *         example: 65154ed674410acd535bc0d3
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateChatSchema'
     *     responses:
     *       200:
     *         description: Returns the updated chat.
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
     *       404:
     *         $ref: '#/components/responses/404Response'
     */
    .put(entityIdValidator("chatId"), chatValidators.updateChatValidator, chatsController.updateById);

export default chatsRouter;
