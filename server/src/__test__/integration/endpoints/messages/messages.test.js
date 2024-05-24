import { jest } from "@jest/globals";
import request from "supertest";
import { StatusCodes } from "http-status-codes";
import config from "../../../../config/index.js";
import { routes, permissions } from "../../../../utils/constants/index.js";
import { connect, disconnect } from "../../../../utils/db/inMemory.js";
import { createCommonAuthHeaders } from "../../utils/headers/index.js";
import amazonS3Mock from "../../utils/mocks/lib/amazonS3.js";
import vectorStoreMock from "../../utils/mocks/repositories/pages/utils/vectorStore.js";
import { getQAChainDefaultMock, qAChainObjectMock } from "../../utils/mocks/services/messages/utils/getQAChain.js";
import createTestingData from "../../utils/testData/createTestingData.js";
import chats from "../../utils/testData/chats.js";
import users from "../../utils/testData/users.js";
import colaborator from "../../utils/testData/colaborator.js";
import { messageDTOCheck, messageSourceDTOCheck } from "../../utils/dtos/messages.js";

// Mocked modules
jest.unstable_mockModule("../../../../lib/amazonS3.js", () => amazonS3Mock);
await import("../../../../lib/amazonS3.js");
jest.unstable_mockModule("../../../../services/messages/utils/getQAChain.js", () => getQAChainDefaultMock);
const qaChainMock = await import("../../../../services/messages/utils/getQAChain.js");
jest.unstable_mockModule("../../../../repositories/pages/utils/vectorStore.js", () => vectorStoreMock);
const { getPagesRetrieverFor } = await import("../../../../repositories/pages/utils/vectorStore.js");

// Tested modules
const app = await import("../../../../../app.js");

const loggedInUser = users[0];
const usersChats = chats.filter((chat) => chat.owner._id === loggedInUser._id);
const usersChat = usersChats[0];
const anotherUsersChats = colaborator.filter(
    (colab) => colab.chat.owner._id !== loggedInUser._id && colab.user._id !== loggedInUser._id
);
const nonInvitedChats = anotherUsersChats.filter(
    (otherUserColab) =>
        !colaborator.find(
            (allColab) => allColab.chat._id === otherUserColab.chat._id && allColab.user._id === loggedInUser._id
        )
);
const noReadPermissionChat = colaborator.find(
    (colab) =>
        colab.chat.owner._id !== loggedInUser._id && !colab.permissions.includes(permissions.colaborator.readDocs)
).chat;

describe("Integration tests for chat messages management endpoints API", () => {
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
        // Login the user
        headers = createCommonAuthHeaders(loggedInUser);
    });

    describe("Integration tests for GET /chats/:chatId/messages", () => {
        const page = 1;
        const limit = 10;
        const msgsRoute = `${config.server.urls.api}/${routes.chats.CHATS}/${usersChat._id}/${routes.messages.MESSAGES}`;
        it("Checks that a list of chat messages is returned when requesting GET to a valid and existing chat Id", async () => {
            // When
            const response = await request(appInstance).get(`${msgsRoute}?limit=${limit}&page=${page}`).set(headers);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body.data).toBeInstanceOf(Array);
            expect(response.body.data.length).toBeGreaterThanOrEqual(0);
            expect(response.body.data.length).toBeLessThanOrEqual(limit);
            response.body.data.forEach((msg) => {
                expect(msg).toEqual(messageDTOCheck);
                msg.sources.forEach((source) => expect(source).toEqual(messageSourceDTOCheck));
            });
        });
        it("Checks that a list of chat messages with sources is NOT returned when requesting GET to chat messages without permission to read documents", async () => {
            // Given
            const anotherUserChat = `${config.server.urls.api}/${routes.chats.CHATS}/${noReadPermissionChat._id}/${routes.messages.MESSAGES}?page=${page}&limit=${limit}`;
            // When
            const response = await request(appInstance).get(anotherUserChat).set(headers);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body.data).toBeInstanceOf(Array);
            expect(response.body.data.length).toBeGreaterThanOrEqual(0);
            expect(response.body.data.length).toBeLessThanOrEqual(limit);
            response.body.data.forEach((msg) => expect(msg).toEqual(messageDTOCheck));
            response.body.data.forEach((msg) => expect(msg.sources).not.toBeDefined());
        });
        it("Checks that a list of chat messages is NOT returned when requesting GET to a invalid chat Id", async () => {
            // Given
            const invalidRoute = `${config.server.urls.api}/${routes.chats.CHATS}/invalid/${routes.messages.MESSAGES}`;
            // When
            const response = await request(appInstance).get(invalidRoute).set(headers);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
        it("Checks that a list of chat messages is NOT returned when requesting GET to a non existant chat Id", async () => {
            // Given
            const invalidRoute = `${config.server.urls.api}/${routes.chats.CHATS}/6639f9c6458c53338c05c38c/${routes.messages.MESSAGES}?limit=${limit}&page=${page}`;
            // When
            const response = await request(appInstance).get(invalidRoute).set(headers);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
        it("Checks that a list of chat messages is NOT returned when requesting GET to a chat that the user is not invited to", async () => {
            // Given
            const invalidRoute = `${config.server.urls.api}/${routes.chats.CHATS}/${nonInvitedChats[0].chat._id}/${routes.messages.MESSAGES}?limit=${limit}&page=${page}`;
            // When
            const response = await request(appInstance).get(invalidRoute).set(headers);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
    });

    describe("Integration tests for POST /chats/:chatId/messages", () => {
        const msgsRoute = `${config.server.urls.api}/${routes.chats.CHATS}/${usersChat._id}/${routes.messages.MESSAGES}`;
        const message = { content: "Hello" };
        it("Checks that a message is sent to an existent chat created by the user", async () => {
            // When
            const response = await request(appInstance).post(msgsRoute).set(headers).send(message);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.CREATED);
            expect(response.body.data).toEqual(messageDTOCheck);
            response.body.data.sources.forEach((msg) => expect(msg).toEqual(messageSourceDTOCheck));
            expect(qaChainMock.default).toHaveBeenCalledTimes(1);
            expect(qAChainObjectMock.invoke).toHaveBeenCalledTimes(1);
            expect(getPagesRetrieverFor).toHaveBeenCalledTimes(1);
        });
        it("Checks that a message is NOT sent to a non existent chat", async () => {
            // Given
            const nonExistentRoute = `${config.server.urls.api}/${routes.chats.CHATS}/6639f9c6458c53338c05c38c/${routes.messages.MESSAGES}`;
            // When
            const response = await request(appInstance).post(nonExistentRoute).set(headers).send(message);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body.errorMsg).toEqual(expect.any(String));
            expect(qaChainMock.default).not.toHaveBeenCalled();
            expect(qAChainObjectMock.invoke).not.toHaveBeenCalled();
            expect(getPagesRetrieverFor).not.toHaveBeenCalled();
        });
        it("Checks that a message is NOT sent to an invalid chat id", async () => {
            // Given
            const invalidChat = `${config.server.urls.api}/${routes.chats.CHATS}/invalid/${routes.messages.MESSAGES}`;
            // When
            const response = await request(appInstance).post(invalidChat).set(headers).send(message);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
            expect(response.body.errorMsg).toEqual(expect.any(String));
            expect(qaChainMock.default).not.toHaveBeenCalled();
            expect(qAChainObjectMock.invoke).not.toHaveBeenCalled();
            expect(getPagesRetrieverFor).not.toHaveBeenCalled();
        });
        it("Checks that a message is NOT sent to a chat the user was not invited to", async () => {
            // Given
            const nonExistentRoute = `${config.server.urls.api}/${routes.chats.CHATS}/${nonInvitedChats[0].chat._id}/${routes.messages.MESSAGES}`;
            // When
            const response = await request(appInstance).post(nonExistentRoute).set(headers).send(message);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body.errorMsg).toEqual(expect.any(String));
            expect(qaChainMock.default).not.toHaveBeenCalled();
            expect(qAChainObjectMock.invoke).not.toHaveBeenCalled();
            expect(getPagesRetrieverFor).not.toHaveBeenCalled();
        });
        it("Checks that a chat message with sources is NOT returned when requesting POST to a chat without permission to read documents", async () => {
            // Given
            const anotherUserChat = `${config.server.urls.api}/${routes.chats.CHATS}/${noReadPermissionChat._id}/${routes.messages.MESSAGES}`;
            // When
            const response = await request(appInstance).post(anotherUserChat).set(headers).send(message);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.CREATED);
            expect(response.body.data).toEqual(messageDTOCheck);
            expect(response.body.sources).not.toBeDefined();
            expect(qaChainMock.default).toHaveBeenCalledTimes(1);
            expect(qAChainObjectMock.invoke).toHaveBeenCalledTimes(1);
            expect(getPagesRetrieverFor).toHaveBeenCalledTimes(1);
        });
        it("Checks that a chat message is NOT sent when requesting POST to a chat with an invalid payload", async () => {
            // Given
            const invalidMessages = [{ nothing: "" }, { content: "" }];
            // When
            for (let i = 0; i < invalidMessages.length; i += 1) {
                const response = await request(appInstance).post(msgsRoute).set(headers).send(invalidMessages[i]);
                // Then
                expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
                expect(response.status).toBe(StatusCodes.BAD_REQUEST);
                expect(response.body.errorMsg).toEqual(expect.any(String));
                expect(qaChainMock.default).not.toHaveBeenCalled();
                expect(qAChainObjectMock.invoke).not.toHaveBeenCalled();
                expect(getPagesRetrieverFor).not.toHaveBeenCalled();
            }
        });
    });
});
