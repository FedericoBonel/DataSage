import { jest } from "@jest/globals";
import request from "supertest";
import { StatusCodes } from "http-status-codes";
import path from "path";
import { chatExcerptDTOCheck, chatDetailDTOCheck } from "../../utils/dtos/chats.js";
import config from "../../../../config/index.js";
import { routes } from "../../../../utils/constants/index.js";
import { connect, disconnect } from "../../../../utils/db/inMemory.js";
import amazonS3Mock from "../../utils/mocks/lib/amazonS3.js";
import createTestingData from "../../utils/testData/createTestingData.js";
import chats from "../../utils/testData/chats.js";
import users from "../../utils/testData/users.js";

// Mocked modules
jest.unstable_mockModule("../../../../lib/amazonS3.js", () => amazonS3Mock);
// TODO Add mock of langchain to avoid using OpenAI's API in tests
const { saveFilesInS3 } = await import("../../../../lib/amazonS3.js");

// Tested modules
const app = await import("../../../../../app.js");

const assetsPath = "src/__test__/integration/endpoints/chats/assets";

const loggedInUser = users[0];
const ownedChat = chats.find((chat) => chat.owner._id === loggedInUser._id);
const ownedChatAnother = chats.find((chat) => chat.owner._id === loggedInUser._id && chat._id !== ownedChat._id);
// Tests
describe("Integration tests for chat management endpoints API", () => {
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

    describe("Integration tests for GET /chats", () => {
        it("Checks that a list of chats is returned when requesting GET to /chats", async () => {
            // Given
            const page = 1;
            const limit = 5;
            const chatRoute = `${config.server.urls.api}/${routes.chats.CHATS}?page=${page}&limit=${limit}`;
            // When
            const response = await request(appInstance).get(chatRoute).send();
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body.data).toBeInstanceOf(Array);
            expect(response.body.data.length).toBeGreaterThanOrEqual(0);
            expect(response.body.data.length).toBeLessThanOrEqual(limit);
            response.body.data.forEach((chat) => expect(chat).toEqual(chatExcerptDTOCheck));
        });

        it("Checks that a list of chats is NOT returned when requesting GET to /chats without mandatory queries", async () => {
            // Given
            const chatRoute = `${config.server.urls.api}/${routes.chats.CHATS}`;
            // When
            const response = await request(appInstance).get(chatRoute).send();
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
    });

    describe("Integration tests for GET /chats/:chatId", () => {
        it("Tests that a chat is returned when an existing Id is requested", async () => {
            // Given
            const chatRoute = `${config.server.urls.api}/${routes.chats.CHATS}/${ownedChat._id}`;
            // When
            const response = await request(appInstance).get(chatRoute);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body.data).toEqual(chatDetailDTOCheck);
        });
        it("Tests that a chat is returned when an invalid Id is requested", async () => {
            // Given
            const chatRoute = `${config.server.urls.api}/${routes.chats.CHATS}/invalid`;
            // When
            const response = await request(appInstance).get(chatRoute);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
        it("Tests that a chat is returned when a non existing Id is requested", async () => {
            // Given
            const chatRoute = `${config.server.urls.api}/${routes.chats.CHATS}/6639f9c6458c53338c05c38c`;
            // When
            const response = await request(appInstance).get(chatRoute);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
    });

    describe("Integration tests for POST /chats", () => {
        const document = path.resolve(assetsPath, "testFile.pdf");
        const document2 = path.resolve(assetsPath, "testFile2.pdf");
        const chatRoute = `${config.server.urls.api}/${routes.chats.CHATS}`;
        it("Checks that a chat is created after sending a correct POST request to /chats", async () => {
            // Given
            const chatName = "name";
            // When
            const response = await request(appInstance)
                .post(chatRoute)
                .field("name", chatName)
                .attach("documents", document)
                .attach("documents", document2);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.CREATED);
            expect(response.body.data).toEqual(chatDetailDTOCheck);
            expect(saveFilesInS3).toHaveBeenCalledTimes(2);
        });
        it("Checks that a chat is NOT created after sending an incorrect POST request to /chats", async () => {
            // Given
            const invalidChatNames = ["", "longerthan32charactersasItWasRequestedByTheUser"];

            for (let i = 0; i < invalidChatNames.length; i += 1) {
                const invalidChatName = invalidChatNames[i];
                // When
                const response = await request(appInstance)
                    .post(chatRoute)
                    .field("name", invalidChatName)
                    .attach("documents", document);

                // Then
                expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
                expect(response.status).toBe(StatusCodes.BAD_REQUEST);
                expect(response.body.errorMsg).toEqual(expect.any(String));
                expect(saveFilesInS3).not.toHaveBeenCalled();
            }
        });
    });

    describe("Integration tests for PUT /chats/:chatId", () => {
        const chatRoute = `${config.server.urls.api}/${routes.chats.CHATS}/${ownedChat._id}`;
        it("Tests that the updated chat is returned when an update is correct", async () => {
            // Given
            const updatedChat = { name: "new name" };
            // When
            const response = await request(appInstance).put(chatRoute).send(updatedChat);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body.data).toEqual(chatDetailDTOCheck);
        });
        it("Tests that the updated chat is NOT returned when an update is incorrect in its body", async () => {
            // Given
            const updatedChats = [
                { name: "" },
                { name: "nametoolongforthechatthatshouldbe32characters" },
                { nonName: "Hello!" },
            ];
            // When
            for (let i = 0; i < updatedChats.length; i += 1) {
                const update = updatedChats[i];
                const response = await request(appInstance).put(chatRoute).send(update);
                // Then
                expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
                expect(response.status).toBe(StatusCodes.BAD_REQUEST);
                expect(response.body.errorMsg).toEqual(expect.any(String));
            }
        });
        it("Tests that the updated chat is NOT returned when an update sends a repeated name", async () => {
            // Given
            const updatedChat = { name: ownedChatAnother.name };
            // When
            const response = await request(appInstance).put(chatRoute).send(updatedChat);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
        it("Tests that the updated chat is NOT returned when an update is sent to a non existant id", async () => {
            // Given
            const nonExistantChatRoute = `${config.server.urls.api}/${routes.chats.CHATS}/6639f9c6458c53338c05c38c`;
            const updatedChat = { name: "new name" };
            // When
            const response = await request(appInstance).put(nonExistantChatRoute).send(updatedChat);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
    });

    describe("Integration tests for DELETE /chats/:chatId", () => {
        const chatRoute = `${config.server.urls.api}/${routes.chats.CHATS}/${ownedChat._id}`;
        it("Tests that the deleted chat is returned when a delete operation is correct", async () => {
            // When
            const response = await request(appInstance).delete(chatRoute);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body.data).toEqual(chatDetailDTOCheck);
        });
        it("Tests that the deleted chat is NOT returned when a delete operation is sent to an invalid id", async () => {
            // Given
            const invalidChatRoute = `${config.server.urls.api}/${routes.chats.CHATS}/invalid`;
            // When
            const response = await request(appInstance).delete(invalidChatRoute);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
        it("Tests that the deleted chat is NOT returned when a delete operation is sent to a non existant id", async () => {
            // Given
            const nonExistantChatRoute = `${config.server.urls.api}/${routes.chats.CHATS}/6639f9c6458c53338c05c38c`;
            // When
            const response = await request(appInstance).delete(nonExistantChatRoute);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
    });
});
