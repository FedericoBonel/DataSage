import request from "supertest";
import { StatusCodes } from "http-status-codes";
import config from "../../../../config/index.js";
import { routes } from "../../../../utils/constants/index.js";
import { connect, disconnect } from "../../../../utils/db/inMemory.js";
import { createCommonAuthHeaders } from "../../utils/headers/index.js";
import createTestingData from "../../utils/testData/createTestingData.js";
import notifications from "../../utils/testData/notifications.js";
import users from "../../utils/testData/users.js";
import { notificationDTOCheck, notificationCountDTOCheck } from "../../utils/dtos/notifications.js";

// Tested modules
const app = await import("../../../../../app.js");

const loggedInUser = users[0];
const notReadCount = notifications.reduce(
    (sum, currNot) => (!currNot.isRead && currNot.to._id === loggedInUser._id ? sum + 1 : sum),
    0
);
const notReadNotification = notifications.find(
    (notification) => notification.to._id === loggedInUser._id && !notification.isRead
);
const anothersNotification = notifications.find((notification) => notification.to._id !== loggedInUser._id);

describe("Integration tests for notifications management endpoints API", () => {
    const appInstance = app.default;
    let headers;

    beforeAll(async () => {
        // Connect to database
        await connect();
    });

    afterAll(async () => {
        // Disconnect from database
        await disconnect();
    });

    beforeEach(async () => {
        // Create dummy data and reset between tests
        await createTestingData();
        // Log in the user
        headers = createCommonAuthHeaders(loggedInUser);
    });

    describe("Integration tests for GET /notifications", () => {
        const page = 1;
        const limit = 10;
        const notificationsRoute = `${config.server.urls.api}/${routes.notifications.NOTIFICATIONS}?page=${page}&limit=${limit}`;
        it("Checks that a user can read their list of notifications", async () => {
            // When
            const response = await request(appInstance).get(notificationsRoute).set(headers);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body.data).toEqual(expect.any(Array));
            expect(response.body.data.length).toBeGreaterThanOrEqual(0);
            expect(response.body.data.length).toBeLessThanOrEqual(limit);
            response.body.data.forEach((notification) => expect(notification).toEqual(notificationDTOCheck));
        });
        it("Checks that a user does not receive a list of notifications when any query params are invalid", async () => {
            // Given
            const invalidPage = -1;
            const invalidLimit = Number.MAX_VALUE;
            const invalidIsRead = "thisisnotboolean";
            const invalidRoute = `${config.server.urls.api}/${routes.notifications.NOTIFICATIONS}?page=${invalidPage}&limit=${invalidLimit}&isRead=${invalidIsRead}`;
            // When
            const response = await request(appInstance).get(invalidRoute).set(headers);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
        it("Checks that a user can filter notifications by isRead property", async () => {
            // Given
            const filterPage = 1;
            const filterLimit = 10;
            const isNotRead = false;
            const isRead = true;
            const isNotReadRoute = `${config.server.urls.api}/${routes.notifications.NOTIFICATIONS}?page=${filterPage}&limit=${filterLimit}&isRead=${isNotRead}`;
            const isReadRoute = `${config.server.urls.api}/${routes.notifications.NOTIFICATIONS}?page=${filterPage}&limit=${filterLimit}&isRead=${isRead}`;
            // When
            const responseIsNotRead = await request(appInstance).get(isNotReadRoute).set(headers);
            const responseIsRead = await request(appInstance).get(isReadRoute).set(headers);
            // Then
            expect(responseIsNotRead.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(responseIsNotRead.status).toBe(StatusCodes.OK);
            expect(responseIsNotRead.body.data).toEqual(expect.any(Array));
            expect(responseIsNotRead.body.data.length).toBeGreaterThanOrEqual(0);
            expect(responseIsNotRead.body.data.length).toBeLessThanOrEqual(limit);
            responseIsNotRead.body.data.forEach((notification) => {
                expect(notification).toEqual(notificationDTOCheck);
                expect(notification.isRead).toBe(isNotRead);
            });
            expect(responseIsRead.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(responseIsRead.status).toBe(StatusCodes.OK);
            expect(responseIsRead.body.data).toEqual(expect.any(Array));
            expect(responseIsRead.body.data.length).toBeGreaterThanOrEqual(0);
            expect(responseIsRead.body.data.length).toBeLessThanOrEqual(limit);
            responseIsRead.body.data.forEach((notification) => {
                expect(notification).toEqual(notificationDTOCheck);
                expect(notification.isRead).toBe(isRead);
            });
        });
    });

    describe("Integration tests for GET /notifications/notread", () => {
        const notificationsCountRoute = `${config.server.urls.api}/${routes.notifications.NOTIFICATIONS}/${routes.notifications.NOT_READ}`;
        it("Checks that a user can read their number of not read notifications", async () => {
            // When
            const response = await request(appInstance).get(notificationsCountRoute).set(headers);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body.data).toEqual(notificationCountDTOCheck);
            expect(response.body.data.notReadCount).toBe(notReadCount);
        });
    });

    describe("Integration tests for PUT /notifications/:notificationId", () => {
        const notificationsRoute = `${config.server.urls.api}/${routes.notifications.NOTIFICATIONS}/${notReadNotification._id}`;
        const updatedNotification = { isRead: true };
        it("Checks that a user can update one of their notifications", async () => {
            // Given
            const updates = [updatedNotification, { isRead: false }, { isRead: true }];
            for (let i = 0; i < updates.length; i += 1) {
                const update = updates[i];
                // When
                const response = await request(appInstance).put(notificationsRoute).set(headers).send(update);
                // Then
                expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
                expect(response.status).toBe(StatusCodes.OK);
                expect(response.body.data).toEqual(notificationDTOCheck);
                expect(response.body.data._id).toEqual(notReadNotification._id);
                expect(response.body.data.isRead).toBe(update.isRead);
            }
        });
        it("Checks that a user can not update a notification with invalid data", async () => {
            // Given
            const invalidNotifications = [
                { to: { _id: "66309dc2c16105f754eaedad" }, isRead: true },
                { isReady: "false" },
                { isRead: "true" },
                { isRead: -12345 },
                { isRead: Number.MIN_VALUE },
                {
                    relatedEntityId: "661b53ab0e4f9aaf2a83d80b",
                },
                { _id: "661b53ab0e4f9aaf2a83d80b", isRead: false },
            ];
            for (let i = 0; i < invalidNotifications.length; i += 1) {
                const invalidNotification = invalidNotifications[i];
                // When
                const response = await request(appInstance)
                    .put(notificationsRoute)
                    .set(headers)
                    .send(invalidNotification);
                // Then
                expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
                expect(response.status).toBe(StatusCodes.BAD_REQUEST);
                expect(response.body.errorMsg).toEqual(expect.any(String));
            }
        });
        it("Checks that a user can not update a non valid notification id", async () => {
            // Given
            const invalidId = `${config.server.urls.api}/${routes.notifications.NOTIFICATIONS}/invalid`;
            // When
            const response = await request(appInstance).put(invalidId).set(headers).send(updatedNotification);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
        it("Checks that a user can not update one of another users notifications", async () => {
            // Given
            const otherUserNotification = `${config.server.urls.api}/${routes.notifications.NOTIFICATIONS}/${anothersNotification._id}`;
            // When
            const response = await request(appInstance)
                .put(otherUserNotification)
                .set(headers)
                .send(updatedNotification);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
        it("Checks that a user can not update a non existent notification", async () => {
            // Given
            const notFoundNotification = `${config.server.urls.api}/${routes.notifications.NOTIFICATIONS}/6639f9c6458c53338c05c38c`;
            // When
            const response = await request(appInstance)
                .put(notFoundNotification)
                .set(headers)
                .send(updatedNotification);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
    });

    describe("Integration tests for DELETE /notifications/:notificationId", () => {
        const notificationsRoute = `${config.server.urls.api}/${routes.notifications.NOTIFICATIONS}/${notReadNotification._id}`;
        it("Checks that a user can delete one of their notifications", async () => {
            // When
            const response = await request(appInstance).delete(notificationsRoute).set(headers);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body.data).toEqual(notificationDTOCheck);
            expect(response.body.data._id).toEqual(notReadNotification._id);
        });
        it("Checks that a user can not delete a non valid notification id", async () => {
            // Given
            const invalidId = `${config.server.urls.api}/${routes.notifications.NOTIFICATIONS}/invalid`;
            // When
            const response = await request(appInstance).delete(invalidId).set(headers);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
        it("Checks that a user can not delete one of another users notifications", async () => {
            // Given
            const otherUserNotification = `${config.server.urls.api}/${routes.notifications.NOTIFICATIONS}/${anothersNotification._id}`;
            // When
            const response = await request(appInstance).delete(otherUserNotification).set(headers);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
        it("Checks that a user can not delete a non existent notification", async () => {
            // Given
            const notFoundNotification = `${config.server.urls.api}/${routes.notifications.NOTIFICATIONS}/6639f9c6458c53338c05c38c`;
            // When
            const response = await request(appInstance).delete(notFoundNotification).set(headers);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
    });
});
