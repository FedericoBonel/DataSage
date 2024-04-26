import { Router } from "express";
import notificationsController from "../controllers/notifications.js";
import { routes } from "../utils/constants/index.js";

const notificationsRouter = Router({ mergeParams: true });

/**
 * @openapi
 * tags:
 *   name: User Notifications
 *   description: API used to manage user notifications.
 */
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

export default notificationsRouter;
