import request from "supertest";
import { StatusCodes } from "http-status-codes";
import config from "../../../../config/index.js";
import { routes } from "../../../../utils/constants/index.js";
import { connect, disconnect } from "../../../../utils/db/inMemory.js";
import createTestingData from "../../utils/testData/createTestingData.js";
import users from "../../utils/testData/users.js";
import colaborator from "../../utils/testData/colaborator.js";
import { chatDetailDTOCheck } from "../../utils/dtos/chats.js";

// Tested modules
const app = await import("../../../../../app.js");

const loggedInUser = users[0];
const nonJoinedColabs = colaborator.filter(
    (colab) => colab.chat.owner._id !== loggedInUser._id && colab.user._id === loggedInUser._id && !colab.hasJoined
);
const nonJoinedChat = nonJoinedColabs[0].chat;
const anotherUsersChats = colaborator.filter(
    (colab) => colab.chat.owner._id !== loggedInUser._id && colab.user._id !== loggedInUser._id
);
const nonInvitedChats = anotherUsersChats.filter(
    (otherUserColab) =>
        !colaborator.find(
            (allColab) => allColab.chat._id === otherUserColab.chat._id && allColab.user._id === loggedInUser._id
        )
);
const joinedColabs = colaborator.filter(
    (colab) => colab.chat.owner._id !== loggedInUser._id && colab.user._id === loggedInUser._id && colab.hasJoined
);
const joinedChat = joinedColabs[0].chat;

describe("Integration tests for chat participations management endpoints API", () => {
    const appInstance = app.default;

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
    });

    describe("Integration tests for POST /chats/:chatId/participants/participation", () => {
        const invitationRoute = `${config.server.urls.api}/${routes.chats.CHATS}/${nonJoinedChat._id}/${routes.participants.PARTICIPANTS}/${routes.participation.PARTICIPATION}`;
        it("Checks that a user can accept a chat invitation to a chat it has been invited to", async () => {
            // When
            const response = await request(appInstance).post(invitationRoute);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.CREATED);
            expect(response.body.data).toEqual(chatDetailDTOCheck);
        });
        it("Checks that a user can not accept a chat invitation to a chat it has not been invited to", async () => {
            // Given
            const nonInvitedRoute = `${config.server.urls.api}/${routes.chats.CHATS}/${nonInvitedChats[0].chat._id}/${routes.participants.PARTICIPANTS}/${routes.participation.PARTICIPATION}`;
            // When
            const response = await request(appInstance).post(nonInvitedRoute);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
        it("Checks that a user can not accept a chat invitation to a chat it has already join", async () => {
            // Given
            const joinedRoute = `${config.server.urls.api}/${routes.chats.CHATS}/${joinedChat._id}/${routes.participants.PARTICIPANTS}/${routes.participation.PARTICIPATION}`;
            // When
            const response = await request(appInstance).post(joinedRoute);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
        it("Checks that a user can not accept a chat invitation to a non existent chat", async () => {
            // Given
            const joinedRoute = `${config.server.urls.api}/${routes.chats.CHATS}/6639f9c6458c53338c05c38c/${routes.participants.PARTICIPANTS}/${routes.participation.PARTICIPATION}`;
            // When
            const response = await request(appInstance).post(joinedRoute);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
        it("Checks that a user can not accept a chat invitation to an invalid chat id", async () => {
            // Given
            const joinedRoute = `${config.server.urls.api}/${routes.chats.CHATS}/invalid/${routes.participants.PARTICIPANTS}/${routes.participation.PARTICIPATION}`;
            // When
            const response = await request(appInstance).post(joinedRoute);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
    });

    describe("Integration tests for DELETE /chats/:chatId/participants/participation", () => {
        const invitationRoute = `${config.server.urls.api}/${routes.chats.CHATS}/${joinedChat._id}/${routes.participants.PARTICIPANTS}/${routes.participation.PARTICIPATION}`;
        it("Checks that a user can leave a chat it has accessed", async () => {
            // When
            const response = await request(appInstance).delete(invitationRoute);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body.data).toEqual(chatDetailDTOCheck);
        });
        it("Checks that a user can not leave a chat it has been invited to but has not yet accessed", async () => {
            // Given
            const nonJoinedRoute = `${config.server.urls.api}/${routes.chats.CHATS}/${nonJoinedChat._id}/${routes.participants.PARTICIPANTS}/${routes.participation.PARTICIPATION}`;
            // When
            const response = await request(appInstance).delete(nonJoinedRoute);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
        it("Checks that a user can not leave a chat it has not been invited to", async () => {
            // Given
            const nonInvitedRoute = `${config.server.urls.api}/${routes.chats.CHATS}/${nonInvitedChats[0].chat._id}/${routes.participants.PARTICIPANTS}/${routes.participation.PARTICIPATION}`;
            // When
            const response = await request(appInstance).delete(nonInvitedRoute);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
        it("Checks that a user can not leave a non existent chat", async () => {
            // Given
            const nonExistent = `${config.server.urls.api}/${routes.chats.CHATS}/6639f9c6458c53338c05c38c/${routes.participants.PARTICIPANTS}/${routes.participation.PARTICIPATION}`;
            // When
            const response = await request(appInstance).delete(nonExistent);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
        it("Checks that a user can not leave a chat with an invalid chat id", async () => {
            // Given
            const invalidChat = `${config.server.urls.api}/${routes.chats.CHATS}/invalid/${routes.participants.PARTICIPANTS}/${routes.participation.PARTICIPATION}`;
            // When
            const response = await request(appInstance).delete(invalidChat);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
    });
});
