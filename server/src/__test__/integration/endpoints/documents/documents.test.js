import { jest } from "@jest/globals";
import request from "supertest";
import { StatusCodes } from "http-status-codes";
import path from "path";
import config from "../../../../config/index.js";
import { routes, permissions } from "../../../../utils/constants/index.js";
import { connect, disconnect } from "../../../../utils/db/inMemory.js";
import { createCommonAuthHeaders } from "../../utils/headers/index.js";
import amazonS3Mock from "../../utils/mocks/lib/amazonS3.js";
import vectorStoreMock from "../../utils/mocks/repositories/pages/utils/vectorStore.js";
import createTestingData from "../../utils/testData/createTestingData.js";
import chats from "../../utils/testData/chats.js";
import users from "../../utils/testData/users.js";
import colaborator from "../../utils/testData/colaborator.js";
import { documentDTOCheck, documentDeleteDTOCheck } from "../../utils/dtos/documents.js";

// Mocked modules
jest.unstable_mockModule("../../../../lib/amazonS3.js", () => amazonS3Mock);
const { saveFilesInS3, deleteFileInS3 } = await import("../../../../lib/amazonS3.js");
jest.unstable_mockModule("../../../../repositories/pages/utils/vectorStore.js", () => vectorStoreMock);
const { insertPagesIntoVectorStore } = await import("../../../../repositories/pages/utils/vectorStore.js");

// Tested modules
const app = await import("../../../../../app.js");

const assetsPath = "src/__test__/integration/endpoints/documents/assets";

const loggedInUser = users[0];
const usersChats = chats.filter((chat) => chat.owner._id === loggedInUser._id);
const usersChat = usersChats[0];
const noReadPermissionChat = colaborator.find(
    (colab) =>
        colab.chat.owner._id !== loggedInUser._id && !colab.permissions.includes(permissions.colaborator.readDocs)
).chat;
const noUploadPermissionColab = colaborator.find(
    (colab) =>
        colab.chat.owner._id !== loggedInUser._id && !colab.permissions.includes(permissions.colaborator.writeDocs)
).chat;
const noUploadPermissionChat = chats.find((chat) => chat._id === noUploadPermissionColab._id);
const anotherUsersChats = colaborator.filter(
    (colab) => colab.chat.owner._id !== loggedInUser._id && colab.user._id !== loggedInUser._id
);
const nonInvitedChats = anotherUsersChats.filter(
    (otherUserColab) =>
        !colaborator.find(
            (allColab) => allColab.chat._id === otherUserColab.chat._id && allColab.user._id === loggedInUser._id
        )
);

describe("Integration tests for chat documents management endpoints API", () => {
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

    describe("Integration tests for GET /chats/:chatId/documents", () => {
        const documentsRoute = `${config.server.urls.api}/${routes.chats.CHATS}/${usersChat._id}/${routes.documents.DOCUMENTS}`;
        it("Checks that a list of chat documents is returned when requesting GET to a valid and existing chat Id", async () => {
            // When
            const response = await request(appInstance).get(documentsRoute).set(headers);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body.data).toBeInstanceOf(Array);
            expect(response.body.data.length).toBeGreaterThanOrEqual(0);
            response.body.data.forEach((doc) => expect(doc).toEqual(documentDTOCheck));
        });
        it("Checks that a list of chat documents is NOT returned when requesting GET to a invalid chat Id", async () => {
            const invalidRoute = `${config.server.urls.api}/${routes.chats.CHATS}/invalid/${routes.documents.DOCUMENTS}`;
            // When
            const response = await request(appInstance).get(invalidRoute).set(headers);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
        it("Checks that a list of chat documents is NOT returned when requesting GET to chat documents without permission to read them", async () => {
            const anotherUserChat = `${config.server.urls.api}/${routes.chats.CHATS}/${noReadPermissionChat._id}/${routes.documents.DOCUMENTS}`;
            // When
            const response = await request(appInstance).get(anotherUserChat).set(headers);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.FORBIDDEN);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
        it("Checks that a list of chat documents is NOT returned when requesting GET to a non existant chat Id", async () => {
            const invalidRoute = `${config.server.urls.api}/${routes.chats.CHATS}/6639f9c6458c53338c05c38c/${routes.documents.DOCUMENTS}`;
            // When
            const response = await request(appInstance).get(invalidRoute).set(headers);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
        it("Checks that a list of chat documents is NOT returned when requesting GET to a chat that the user is not invited to", async () => {
            const invalidRoute = `${config.server.urls.api}/${routes.chats.CHATS}/${nonInvitedChats[0].chat._id}/${routes.documents.DOCUMENTS}`;
            // When
            const response = await request(appInstance).get(invalidRoute).set(headers);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
    });

    describe("Integration tests for POST /chats/:chatId/documents", () => {
        const documentsRoute = `${config.server.urls.api}/${routes.chats.CHATS}/${usersChat._id}/${routes.documents.DOCUMENTS}`;
        const document = path.resolve(assetsPath, "testFile.pdf");
        const document2 = path.resolve(assetsPath, "testFile2.pdf");
        it("Checks that a document is uploaded and returned when requesting POST to an owned chat", async () => {
            // When
            const response = await request(appInstance)
                .post(documentsRoute)
                .set(headers)
                .attach("documents", document)
                .attach("documents", document2);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.CREATED);
            expect(response.body.data).toBeInstanceOf(Array);
            expect(response.body.data.length).toBeGreaterThanOrEqual(0);
            expect(saveFilesInS3).toHaveBeenCalledTimes(2);
            expect(insertPagesIntoVectorStore).toHaveBeenCalledTimes(1);
            response.body.data.forEach((doc) => expect(doc).toEqual(documentDTOCheck));
        });
        it("Checks that a document is NOT uploaded and returned when requesting POST to an invalid id", async () => {
            // Given
            const invalidRoute = `${config.server.urls.api}/${routes.chats.CHATS}/invalid/${routes.documents.DOCUMENTS}`;
            // When
            const response = await request(appInstance).post(invalidRoute).set(headers);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
            expect(response.body.errorMsg).toEqual(expect.any(String));
            expect(response.body.errors).toEqual(expect.any(Array));
            expect(saveFilesInS3).not.toHaveBeenCalled();
            expect(insertPagesIntoVectorStore).not.toHaveBeenCalled();
        });
        it("Checks that a document is NOT uploaded and returned when requesting POST with invalid documents", async () => {
            // Given
            const invalidDocs = [
                path.resolve(assetsPath, "tooManyPages.pdf"),
                path.resolve(assetsPath, "tooHeavy.pdf"),
            ];
            for (let i = 0; i < invalidDocs.length; i += 1) {
                const doc = invalidDocs[i];
                // When
                const response = await request(appInstance).post(documentsRoute).set(headers).attach("documents", doc);
                // Then
                expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
                expect(response.status).toBe(StatusCodes.BAD_REQUEST);
                expect(response.body.errorMsg).toEqual(expect.any(String));
                expect(saveFilesInS3).not.toHaveBeenCalled();
                expect(insertPagesIntoVectorStore).not.toHaveBeenCalled();
            }
        });
        it("Checks that a document is NOT uploaded and returned when requesting POST to a chat where the user does not have the required permissions", async () => {
            // Given
            const anotherUserChat = `${config.server.urls.api}/${routes.chats.CHATS}/${noUploadPermissionChat._id}/${routes.documents.DOCUMENTS}`;
            // When
            const response = await request(appInstance).post(anotherUserChat).set(headers);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.FORBIDDEN);
            expect(response.body.errorMsg).toEqual(expect.any(String));
            expect(saveFilesInS3).not.toHaveBeenCalled();
            expect(insertPagesIntoVectorStore).not.toHaveBeenCalled();
        });
        it("Checks that a document is NOT uploaded and returned when requesting POST to a chat that does not exist", async () => {
            const invalidRoute = `${config.server.urls.api}/${routes.chats.CHATS}/6639f9c6458c53338c05c38c/${routes.documents.DOCUMENTS}`;
            // When
            const response = await request(appInstance).post(invalidRoute).set(headers);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body.errorMsg).toEqual(expect.any(String));
            expect(saveFilesInS3).not.toHaveBeenCalled();
            expect(insertPagesIntoVectorStore).not.toHaveBeenCalled();
        });
        it("Checks that a document is NOT uploaded and returned when requesting POST to a chat that the user wasn't invited to", async () => {
            const invalidRoute = `${config.server.urls.api}/${routes.chats.CHATS}/${nonInvitedChats[0].chat._id}/${routes.documents.DOCUMENTS}`;
            // When
            const response = await request(appInstance).post(invalidRoute).set(headers);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body.errorMsg).toEqual(expect.any(String));
            expect(saveFilesInS3).not.toHaveBeenCalled();
            expect(insertPagesIntoVectorStore).not.toHaveBeenCalled();
        });
    });

    describe("Integration tests for DELETE /chats/:chatId/documents", () => {
        const documentsRoute = `${config.server.urls.api}/${routes.chats.CHATS}/${usersChat._id}/${routes.documents.DOCUMENTS}/${usersChat.documents[0]._id}`;
        it("Checks that a document is deleted and returned when requesting DELETE to an owned chat", async () => {
            // When
            const response = await request(appInstance).delete(documentsRoute).set(headers);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body.data).toEqual(documentDeleteDTOCheck);
            expect(response.body.data._id).toBe(usersChat.documents[0]._id);
            expect(deleteFileInS3).toHaveBeenCalledTimes(1);
        });
        it("Checks that a document is NOT deleted and returned when requesting DELETE to an invalid id", async () => {
            // given
            const invalidRoute = `${config.server.urls.api}/${routes.chats.CHATS}/${usersChat._id}/${routes.documents.DOCUMENTS}/invalid`;
            // When
            const response = await request(appInstance).delete(invalidRoute).set(headers);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
            expect(response.body.errorMsg).toEqual(expect.any(String));
            expect(deleteFileInS3).not.toHaveBeenCalled();
        });
        it("Checks that a document is NOT deleted and returned when requesting DELETE to a non existant id", async () => {
            // given
            const invalidRoute = `${config.server.urls.api}/${routes.chats.CHATS}/${usersChat._id}/${routes.documents.DOCUMENTS}/6639f9c6458c53338c05c38c`;
            // When
            const response = await request(appInstance).delete(invalidRoute).set(headers);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body.errorMsg).toEqual(expect.any(String));
            expect(deleteFileInS3).not.toHaveBeenCalled();
        });
        it("Checks that a document is NOT deleted and returned when requesting DELETE to a document in a chat not owned", async () => {
            // given
            const invalidRoute = `${config.server.urls.api}/${routes.chats.CHATS}/${noReadPermissionChat._id}/${routes.documents.DOCUMENTS}/${noUploadPermissionChat.documents[0]._id}`;
            // When
            const response = await request(appInstance).delete(invalidRoute).set(headers);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body.errorMsg).toEqual(expect.any(String));
            expect(deleteFileInS3).not.toHaveBeenCalled();
        });
    });
});
