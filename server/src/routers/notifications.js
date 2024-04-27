import { Router } from "express";
import notificationsController from "../controllers/notifications.js";
import notificationValidator from "../middleware/validators/notifications/index.js";
import entityIdValidator from "../middleware/validators/utils/entityIdValidator.js";
import { routes } from "../utils/constants/index.js";

const notificationsRouter = Router({ mergeParams: true });

/**
 * @openapi
 * tags:
 *   name: User Notifications
 *   description: API used to manage user notifications.
 */
notificationsRouter
    .route("/")
    /**
     * @openapi
     * /notifications:
     *   get:
     *     tags: [User Notifications]
     *     summary: Gets all notifications for the logged in user.
     *     description: Gets all notifications for the logged in user by creation date in descending order. It can be used in a client to show the user their notifications in a list.
     *     parameters:
     *       - $ref: '#/components/parameters/page'
     *       - $ref: '#/components/parameters/limit'
     *       - $ref: '#/components/parameters/NotificationIsRead'
     *     responses:
     *       200:
     *         description: The retrieval was successful and a list with all the notifications that match the parameters provided is returned.
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
     *                         $ref: '#/components/schemas/NotificationOutputDTO'
     *       400:
     *         $ref: '#/components/responses/400Response'
     */
    .get(notificationValidator.notificationFilterValidator, notificationsController.get);

notificationsRouter
    .route(`/${routes.notifications.NOT_READ}`)
    /**
     * @openapi
     * /notifications/notread:
     *   get:
     *     tags: [User Notifications]
     *     summary: Checks the total amount of not read notifications for the logged in user.
     *     description: Checks the total amount of not read notifications for the logged in user. It can be used in a client to show the user some visual clue letting them know that they have new notifications they haven't read.
     *     responses:
     *       200:
     *         description: The total amount of notifications the user has not read yet is returned successfully. This could be 0 so you should handle this in your client.
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
     *                       $ref: "#/components/schemas/NotificationCountDTO"
     */
    .get(notificationsController.checkNotReadCount);

notificationsRouter
    .route("/:notificationId")
    /**
     * @openapi
     * /notifications/{notificationId}:
     *   put:
     *     tags: [User Notifications]
     *     summary: Updates a notification that belongs to the logged in user.
     *     description: Updates a notification that belongs to the logged in user. It can be used in a client to mark the notification as read or unread when the user clicks it or interacts with it in some way.
     *     parameters:
     *       - in: path
     *         name: notificationId
     *         description: Id of the notification to be updated.
     *         example: 65154ed674410acd535bc0d3
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: The notification has been updated successfully and is returned in its updated form.
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
     *                       $ref: "#/components/schemas/NotificationOutputDTO"
     *       400:
     *         $ref: '#/components/responses/400Response'
     *       404:
     *         $ref: '#/components/responses/404Response'
     */
    .put(
        entityIdValidator("notificationId"),
        notificationValidator.notificationUpdateValidator,
        notificationsController.updateById
    );

export default notificationsRouter;
