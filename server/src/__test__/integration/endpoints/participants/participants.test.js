import request from "supertest";
import { StatusCodes } from "http-status-codes";
import config from "../../../../config/index.js";
import { routes, permissions } from "../../../../utils/constants/index.js";
import { connect, disconnect } from "../../../../utils/db/inMemory.js";
import createTestingData from "../../utils/testData/createTestingData.js";
import chats from "../../utils/testData/chats.js";
import users from "../../utils/testData/users.js";
import colaborator from "../../utils/testData/colaborator.js";
import { participantExcerptDTOCheck, participantDTOCheck } from "../../utils/dtos/participants.js";

// Tested modules
const app = await import("../../../../../app.js");

const anotherUser = users[1];
const loggedInUser = users[0];
const usersChats = chats.filter((chat) => chat.owner._id === loggedInUser._id);
const usersChat = usersChats[0];
const usersChatNoParticipants = usersChats.filter(
    (userChat) =>
        !colaborator.find((allColab) => allColab.chat._id === userChat._id && allColab.user._id !== loggedInUser._id)
);
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

describe("Integration tests for chat participants management endpoints API", () => {
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

    describe("Integration tests for GET /chats/:chatId/participants", () => {
        const page = 1;
        const limit = 10;
        const participantsRoute = `${config.server.urls.api}/${routes.chats.CHATS}/${usersChat._id}/${routes.participants.PARTICIPANTS}`;
        it("Checks that a list of chat participants is returned when requesting GET a valid chat", async () => {
            // When
            const response = await request(appInstance).get(`${participantsRoute}?limit=${limit}&page=${page}`);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body.data).toBeInstanceOf(Array);
            expect(response.body.data.length).toBeGreaterThanOrEqual(0);
            expect(response.body.data.length).toBeLessThanOrEqual(limit);
            response.body.data.forEach((participant) => expect(participant).toEqual(participantExcerptDTOCheck));
        });
        it("Checks that a list of chat participants is NOT returned when requesting GET to an invalid chat Id", async () => {
            // Given
            const invalidRoute = `${config.server.urls.api}/${routes.chats.CHATS}/invalid/${routes.participants.PARTICIPANTS}`;
            // When
            const response = await request(appInstance).get(invalidRoute);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
        it("Checks that a list of chat participants is NOT returned when requesting GET to a non existant chat Id", async () => {
            // Given
            const invalidRoute = `${config.server.urls.api}/${routes.chats.CHATS}/6639f9c6458c53338c05c38c/${routes.participants.PARTICIPANTS}?limit=${limit}&page=${page}`;
            // When
            const response = await request(appInstance).get(invalidRoute);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
        it("Checks that a list of chat participants is NOT returned when requesting GET to a chat that the user is not the owner from", async () => {
            // Given
            const invalidRoute = `${config.server.urls.api}/${routes.chats.CHATS}/${nonInvitedChats[0].chat._id}/${routes.participants.PARTICIPANTS}?limit=${limit}&page=${page}`;
            // When
            const response = await request(appInstance).get(invalidRoute);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
        it("Checks that a list of chat participants is NOT returned when requesting GET to a chat that the user is invited to but is not the owner from", async () => {
            // Given
            const invalidRoute = `${config.server.urls.api}/${routes.chats.CHATS}/${noReadPermissionChat._id}/${routes.participants.PARTICIPANTS}?limit=${limit}&page=${page}`;
            // When
            const response = await request(appInstance).get(invalidRoute);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
    });

    describe("Integration tests for POST /chats/:chatId/participants", () => {
        const participantsRoute = `${config.server.urls.api}/${routes.chats.CHATS}/${usersChatNoParticipants[0]._id}/${routes.participants.PARTICIPANTS}`;
        const newParticipant = { email: anotherUser.email, permissions: [permissions.colaborator.readDocs] };
        it("Checks that a participant is added to an existant chat created by the user", async () => {
            // When
            const response = await request(appInstance).post(participantsRoute).send(newParticipant);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.CREATED);
            expect(response.body.data).toEqual(participantDTOCheck);
        });
        it("Checks that a participant is not added to a chat it already has been invited to", async () => {
            // Given
            const nonInvitedRoute = `${config.server.urls.api}/${routes.chats.CHATS}/${usersChat._id}/${routes.participants.PARTICIPANTS}`;
            // When
            const response = await request(appInstance).post(nonInvitedRoute).send(newParticipant);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
        it("Checks that a participant is not added when sending invalid data in the payload", async () => {
            // Given
            const invalidParticipants = [
                { email: anotherUser.email },
                { nothing: "nothing" },
                { permissions: [] },
                {},
                { permissions: [permissions.colaborator.readDocs, permissions.colaborator.readDocs] },
            ];
            for (let i = 0; i < invalidParticipants.length; i += 1) {
                const invalidParticipant = invalidParticipants[i];
                // When
                const response = await request(appInstance).post(participantsRoute).send(invalidParticipant);
                // Then
                expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
                expect(response.status).toBe(StatusCodes.BAD_REQUEST);
                expect(response.body.errorMsg).toEqual(expect.any(String));
            }
        });
        it("Checks that a participant is not added when sending non existant permissions in the payload", async () => {
            // Given
            const invalidParticipants = [
                { email: anotherUser.email, permissions: ["whatever"] },
                { email: anotherUser.email, permissions: ["read_people"] },
                { email: anotherUser.email, permissions: ["asdasd"] },
            ];
            for (let i = 0; i < invalidParticipants.length; i += 1) {
                const invalidParticipant = invalidParticipants[i];
                // When
                const response = await request(appInstance).post(participantsRoute).send(invalidParticipant);
                // Then
                expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
                expect(response.status).toBe(StatusCodes.NOT_FOUND);
                expect(response.body.errorMsg).toEqual(expect.any(String));
            }
        });
        it("Checks that a chat participant is NOT invited when requesting to a chat the user is not the owner from", async () => {
            // Given
            const invalidRoute = `${config.server.urls.api}/${routes.chats.CHATS}/${noReadPermissionChat._id}/${routes.participants.PARTICIPANTS}`;
            // When
            const response = await request(appInstance).post(invalidRoute).send(newParticipant);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
        it("Checks that a chat participant is NOT invited when requesting to a chat that does not exist", async () => {
            // Given
            const invalidRoute = `${config.server.urls.api}/${routes.chats.CHATS}/6639f9c6458c53338c05c38c/${routes.participants.PARTICIPANTS}`;
            // When
            const response = await request(appInstance).post(invalidRoute).send(newParticipant);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
        it("Checks that a chat participant is NOT invited when requesting to a chat with an invalid id", async () => {
            // Given
            const invalidRoute = `${config.server.urls.api}/${routes.chats.CHATS}/invalid/${routes.participants.PARTICIPANTS}`;
            // When
            const response = await request(appInstance).post(invalidRoute).send(newParticipant);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
        it("Checks that a chat participant is NOT invited when the chat owner invites themselves", async () => {
            // Given
            const invalidParticipant = { email: loggedInUser.email, permissions: [permissions.colaborator.readDocs] };
            // When
            const response = await request(appInstance).post(participantsRoute).send(invalidParticipant);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
    });

    describe("Integration tests for GET /chats/chatId/participants/:participantId", () => {
        const participantsRoute = `${config.server.urls.api}/${routes.chats.CHATS}/${usersChat._id}/${routes.participants.PARTICIPANTS}/${anotherUser._id}`;
        it("Checks that a chat participant is returned when requesting GET to a valid chat Id and participant Id", async () => {
            // When
            const response = await request(appInstance).get(participantsRoute);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body.data).toEqual(participantDTOCheck);
        });
        it("Checks that a chat participants is NOT returned when requesting GET to invalid ids", async () => {
            // Given
            const invalidChat = `${config.server.urls.api}/${routes.chats.CHATS}/invalid/${routes.participants.PARTICIPANTS}/${anotherUser._id}`;
            const invalidParticipant = `${config.server.urls.api}/${routes.chats.CHATS}/${usersChat._id}/${routes.participants.PARTICIPANTS}/invalid`;
            // When
            const resInvalidChat = await request(appInstance).get(invalidChat);
            const resInvalidParticipant = await request(appInstance).get(invalidParticipant);
            // Then
            expect(resInvalidChat.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(resInvalidChat.status).toBe(StatusCodes.BAD_REQUEST);
            expect(resInvalidChat.body.errorMsg).toEqual(expect.any(String));
            expect(resInvalidParticipant.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(resInvalidParticipant.status).toBe(StatusCodes.BAD_REQUEST);
            expect(resInvalidParticipant.body.errorMsg).toEqual(expect.any(String));
        });
        it("Checks that a chat participants is NOT returned when requesting GET to non existent ids", async () => {
            // Given
            const invalidChat = `${config.server.urls.api}/${routes.chats.CHATS}/6639f9c6458c53338c05c38c/${routes.participants.PARTICIPANTS}/${anotherUser._id}`;
            const invalidParticipant = `${config.server.urls.api}/${routes.chats.CHATS}/${usersChat._id}/${routes.participants.PARTICIPANTS}/6639f9c6458c53338c05c38c`;
            // When
            const resInvalidChat = await request(appInstance).get(invalidChat);
            const resInvalidParticipant = await request(appInstance).get(invalidParticipant);
            // Then
            expect(resInvalidChat.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(resInvalidChat.status).toBe(StatusCodes.NOT_FOUND);
            expect(resInvalidChat.body.errorMsg).toEqual(expect.any(String));
            expect(resInvalidParticipant.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(resInvalidParticipant.status).toBe(StatusCodes.NOT_FOUND);
            expect(resInvalidParticipant.body.errorMsg).toEqual(expect.any(String));
        });
        it("Checks that a chat participant is NOT returned when requesting GET to a chat that the user is not the owner from", async () => {
            // Given
            const invalidRoute = `${config.server.urls.api}/${routes.chats.CHATS}/${nonInvitedChats[0].chat._id}/${routes.participants.PARTICIPANTS}/${loggedInUser._id}`;
            // When
            const response = await request(appInstance).get(invalidRoute);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
        it("Checks that a chat participants is NOT returned when requesting GET to a chat that the user is invited to but is not the owner from", async () => {
            // Given
            const invalidRoute = `${config.server.urls.api}/${routes.chats.CHATS}/${noReadPermissionChat._id}/${routes.participants.PARTICIPANTS}/${loggedInUser._id}`;
            // When
            const response = await request(appInstance).get(invalidRoute);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
    });

    describe("Integration tests for PUT /chats/:chatId/participants/:participantId", () => {
        const participantsRoute = `${config.server.urls.api}/${routes.chats.CHATS}/${usersChat._id}/${routes.participants.PARTICIPANTS}/${anotherUser._id}`;
        const updatedParticipant = { permissions: [permissions.colaborator.readDocs] };
        it("Checks that a participant is updated in a chat created by the user", async () => {
            // When
            const response = await request(appInstance).put(participantsRoute).send(updatedParticipant);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body.data).toEqual(participantDTOCheck);
        });
        it("Checks that a non existent participant is not updated", async () => {
            // Given
            const nonInvitedRoute = `${config.server.urls.api}/${routes.chats.CHATS}/${usersChatNoParticipants[0]._id}/${routes.participants.PARTICIPANTS}/${anotherUser._id}`;
            // When
            const response = await request(appInstance).put(nonInvitedRoute).send(updatedParticipant);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
        it("Checks that a participant is not updated when sending invalid data in the payload", async () => {
            // Given
            const invalidParticipants = [
                { email: anotherUser.email, permissions: [] },
                { nothing: "nothing" },
                { permissions: undefined },
                {
                    permissions: [
                        permissions.colaborator.readDocs,
                        permissions.colaborator.writeDocs,
                        "read_something",
                    ],
                },
                { permissions: [123, 123, 14, new Date()] },
                {
                    permissions: [permissions.colaborator.readDocs, permissions.colaborator.writeDocs],
                    owner: { _id: "6639f9c6458c53338c05c38c" },
                },
            ];
            for (let i = 0; i < invalidParticipants.length; i += 1) {
                const invalidParticipant = invalidParticipants[i];
                // When
                const response = await request(appInstance).put(participantsRoute).send(invalidParticipant);
                // Then
                expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
                expect(response.status).toBe(StatusCodes.BAD_REQUEST);
                expect(response.body.errorMsg).toEqual(expect.any(String));
            }
        });
        it("Checks that a participant is not updated when sending non existant or repeated permissions in the payload", async () => {
            // Given
            const invalidParticipants = [
                { permissions: ["whatever"] },
                { permissions: ["read_people"] },
                { permissions: ["asdasd"] },
                { permissions: [permissions.colaborator.readDocs, permissions.colaborator.readDocs] },
            ];
            for (let i = 0; i < invalidParticipants.length; i += 1) {
                const invalidParticipant = invalidParticipants[i];
                // When
                const response = await request(appInstance).put(participantsRoute).send(invalidParticipant);
                // Then
                expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
                expect(response.status).toBe(StatusCodes.NOT_FOUND);
                expect(response.body.errorMsg).toEqual(expect.any(String));
            }
        });
        it("Checks that a chat participant is NOT updated when requesting a chat that does not exist", async () => {
            // Given
            const invalidRoute = `${config.server.urls.api}/${routes.chats.CHATS}/6639f9c6458c53338c05c38c/${routes.participants.PARTICIPANTS}/${anotherUser._id}`;
            // When
            const response = await request(appInstance).put(invalidRoute).send(updatedParticipant);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
        it("Checks that a chat participant is NOT updated when requesting to a chat with an invalid id", async () => {
            // Given
            const invalidRoute = `${config.server.urls.api}/${routes.chats.CHATS}/invalid/${routes.participants.PARTICIPANTS}/${anotherUser._id}`;
            // When
            const response = await request(appInstance).put(invalidRoute).send(updatedParticipant);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
        it("Checks that a chat owner is NOT updated when they update their own permissions", async () => {
            // Given
            const invalidRoute = `${config.server.urls.api}/${routes.chats.CHATS}/${usersChat._id}/${routes.participants.PARTICIPANTS}/${loggedInUser._id}`;
            const invalidParticipant = { permissions: [permissions.colaborator.readDocs] };
            // When
            const response = await request(appInstance).put(invalidRoute).send(invalidParticipant);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
        it("Checks that a participant is NOT updated when a non owner user tries to update them", async () => {
            // Given
            const invalidRoute = `${config.server.urls.api}/${routes.chats.CHATS}/${noReadPermissionChat._id}/${routes.participants.PARTICIPANTS}/${anotherUser._id}`;
            const invalidParticipant = { permissions: [permissions.colaborator.readDocs] };
            // When
            const response = await request(appInstance).put(invalidRoute).send(invalidParticipant);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
    });

    describe("Integration tests for DELETE /chats/:chatId/participants/:participantId", () => {
        const participantsRoute = `${config.server.urls.api}/${routes.chats.CHATS}/${usersChat._id}/${routes.participants.PARTICIPANTS}/${anotherUser._id}`;
        it("Checks that a participant is deleted from a chat created by the user", async () => {
            // When
            const response = await request(appInstance).delete(participantsRoute);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body.data).toEqual(participantDTOCheck);
        });
        it("Checks that a non existant participant is not deleted", async () => {
            // Given
            const nonInvitedRoute = `${config.server.urls.api}/${routes.chats.CHATS}/${usersChatNoParticipants[0]._id}/${routes.participants.PARTICIPANTS}/${anotherUser._id}`;
            // When
            const response = await request(appInstance).delete(nonInvitedRoute);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
        it("Checks that a chat participant is NOT removed from a chat that the user is not the owner from", async () => {
            // Given
            const invalidRoute = `${config.server.urls.api}/${routes.chats.CHATS}/${noReadPermissionChat._id}/${routes.participants.PARTICIPANTS}/${anotherUser._id}`;
            // When
            const response = await request(appInstance).delete(invalidRoute);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
        it("Checks that a chat participant is NOT deleted when deleting from a non existent chat", async () => {
            // Given
            const invalidRoute = `${config.server.urls.api}/${routes.chats.CHATS}/6639f9c6458c53338c05c38c/${routes.participants.PARTICIPANTS}/${anotherUser._id}`;
            // When
            const response = await request(appInstance).delete(invalidRoute);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
        it("Checks that a chat participant is NOT deleted when requesting to a chat with an invalid id", async () => {
            // Given
            const invalidRoute = `${config.server.urls.api}/${routes.chats.CHATS}/invalid/${routes.participants.PARTICIPANTS}/${anotherUser._id}`;
            // When
            const response = await request(appInstance).delete(invalidRoute);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
        it("Checks that a chat owner is NOT deleted when they delete themselves", async () => {
            // Given
            const invalidRoute = `${config.server.urls.api}/${routes.chats.CHATS}/${usersChat._id}/${routes.participants.PARTICIPANTS}/${loggedInUser._id}`;
            // When
            const response = await request(appInstance).put(invalidRoute).send(invalidRoute);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
    });
});
