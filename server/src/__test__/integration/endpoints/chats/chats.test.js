import { jest } from "@jest/globals";
import request from "supertest";
import { StatusCodes } from "http-status-codes";
import path from "path";
import { chatExcerptDTOCheck, chatDetailDTOCheck } from "../../utils/dtos/chats.js";
import config from "../../../../config/index.js";
import { routes } from "../../../../utils/constants/index.js";
import { connect, disconnect } from "../../../../utils/db/inMemory.js";
import createTestingData from "../../utils/testData/createTestingData.js";
import chats from "../../utils/testData/chats.js";

// Mocked/tested modules
jest.unstable_mockModule("../../../../lib/amazonS3.js", () => ({
    saveFilesInS3: jest.fn(async () => "s3ImageID"),
    getSignedURLById: jest.fn(async (fileId) => `https://example.com/${fileId}`),
    deleteFileInS3: jest.fn(async () => undefined),
    deleteMultipleFilesInS3: jest.fn(async () => undefined),
}));
const { saveFilesInS3 } = await import("../../../../lib/amazonS3.js");
const app = await import("../../../../../app.js");

// Tests
describe("Integration tests for chat management endpoints API", () => {
    const appInstance = app.default;
    beforeAll(async () => {
        // Connect to database
        await connect();
        // Create dummy data
        await createTestingData();
    });

    afterAll(async () => {
        // Disconnect from database
        await disconnect();
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

    describe("Integration tests for POST /chats", () => {
        const document = path.resolve("src", "__test__", "integration", "endpoints", "chats", "assets", "testFile.pdf");
        const chatRoute = `${config.server.urls.api}/${routes.chats.CHATS}`;
        it("Checks that a chat is created after sending a correct POST request to /chats", async () => {
            // Given
            const chatName = "name";

            // When
            const response = await request(appInstance)
                .post(chatRoute)
                .field("name", chatName)
                .attach("documents", document);

            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.CREATED);
            expect(response.body.data).toEqual(chatDetailDTOCheck);
            expect(saveFilesInS3).toHaveBeenCalled();
        });
        it("Checks that a chat is NOT created after sending an incorrect POST request to /chats", async () => {
            // Given
            const invalidChatNames = ["", "longerthan32charactersasItWasRequestedByTheUser"];

            invalidChatNames.forEach(async (invalidChatName) => {
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
            });
        });
    });

    describe("Integration tests for GET /chats/:chatId", () => {
        it("Tests that a chat is returned when an existing Id is requested", async () => {
            // When
            const chatRoute = `${config.server.urls.api}/${routes.chats.CHATS}/${chats[0]._id}`;
            const response = await request(appInstance).get(chatRoute);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body.data).toEqual(chatDetailDTOCheck);
        });
        it("Tests that a chat is returned when an invalid Id is requested", async () => {
            // When
            const chatRoute = `${config.server.urls.api}/${routes.chats.CHATS}/invalid`;
            const response = await request(appInstance).get(chatRoute);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
        it("Tests that a chat is returned when a non existing Id is requested", async () => {
            // When
            const chatRoute = `${config.server.urls.api}/${routes.chats.CHATS}/6639f9c6458c53338c05c38c`;
            const response = await request(appInstance).get(chatRoute);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
    });
});
