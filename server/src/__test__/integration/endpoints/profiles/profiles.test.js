import request from "supertest";
import jwtUtils from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import config from "../../../../config/index.js";
import { routes } from "../../../../utils/constants/index.js";
import { connect, disconnect } from "../../../../utils/db/inMemory.js";
import { createCommonAuthHeaders } from "../../utils/headers/index.js";
import createTestingData from "../../utils/testData/createTestingData.js";
import { nonEncryptedUsers } from "../../utils/testData/users.js";
import { profileDTOCheck } from "../../utils/dtos/profiles.js";

// Tested modules
const app = await import("../../../../../app.js");

const loggedInUser = nonEncryptedUsers[0];

describe("Integration tests for chat participations management endpoints API", () => {
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

    describe("Integration tests for GET /profile", () => {
        const profileRoute = `${config.server.urls.api}/${routes.profiles.PROFILE}`;
        it("Checks that a user can get their profile information", async () => {
            // When
            const response = await request(appInstance).get(profileRoute).set(headers);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body.data).toEqual(profileDTOCheck);
            expect(response.body.data._id).toEqual(loggedInUser._id);
        });
    });

    describe("Integration tests for PATCH /profile", () => {
        const profileRoute = `${config.server.urls.api}/${routes.profiles.PROFILE}`;
        const updates = {
            names: "example names",
            lastnames: "example lastnames",
            credentials: {
                password: loggedInUser.password.content,
                newEmail: "email@email.com",
                newPassword: "tEst@aaa1",
            },
        };
        it("Checks that a user can update their profile information", async () => {
            // When
            const response = await request(appInstance).patch(profileRoute).set(headers).send(updates);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body.data).toEqual(profileDTOCheck);
            expect(response.body.data._id).toEqual(loggedInUser._id);
            expect(response.body.data.email).toEqual(updates.credentials.newEmail);
            expect(response.body.data.names).toEqual(updates.names);
            expect(response.body.data.lastnames).toEqual(updates.lastnames);
        });
        it("Checks that a user cant update their profile with invalid information", async () => {
            // Given
            const invalidUpdates = [
                { credentials: { newEmail: "emailemail.com" }, names: "example names", lastnames: "example lastnames" },
                { names: "", lastnames: "valid" },
                { names: "valid", lastnames: 1 },
                { lastnames: { $set: { names: "myown" } } },
                { credentials: { newPassword: "weakpassword", password: loggedInUser.password.content } },
                { names: "real names", isAdmin: true },
                { credentials: { newEmail: "valid_but_no_pass@email.com" } },
                { credentials: { newPassword: "validPass@!102NoOld_pass" } },
                {
                    credentials: {
                        $set: { password: "myown" },
                        newEmail: "valid@email.com",
                        password: loggedInUser.password.content,
                    },
                },
                { credentials: {} },
            ];
            for (let i = 0; i < invalidUpdates.length; i += 1) {
                const invalidUpdate = invalidUpdates[i];
                // When
                const response = await request(appInstance).patch(profileRoute).set(headers).send(invalidUpdate);
                // Then
                expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
                expect(response.status).toBe(StatusCodes.BAD_REQUEST);
                expect(response.body.errorMsg).toEqual(expect.any(String));
            }
        });
    });

    describe("Integration tests for DELETE /profile", () => {
        const profileRoute = `${config.server.urls.api}/${routes.profiles.PROFILE}`;
        it("Checks that a user can delete their account", async () => {
            // When
            const response = await request(appInstance).delete(profileRoute).set(headers);
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body.data).toEqual(profileDTOCheck);
            expect(response.body.data._id).toEqual(loggedInUser._id);
            expect(response.body.data.email).toEqual(loggedInUser.email);
            expect(response.body.data.names).toEqual(loggedInUser.names);
            expect(response.body.data.lastnames).toEqual(loggedInUser.lastnames);
        });
        it("Checks that a user can not delete their account with an expired token", async () => {
            // Given
            const expiredToken = jwtUtils.sign({ _id: loggedInUser._id }, config.jwt.accessTokenSecret, {
                expiresIn: "1ms",
            });
            // When
            const response = await request(appInstance)
                .delete(profileRoute)
                .set({ authorization: `Bearer ${expiredToken}` });
            // Then
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
    });
});
