import request from "supertest";
import jwtUtils from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { StatusCodes } from "http-status-codes";
import { accessTokenDTOCheck } from "../../utils/dtos/tokens.js";
import config from "../../../../config/index.js";
import { routes } from "../../../../utils/constants/index.js";
import { connect, disconnect } from "../../../../utils/db/inMemory.js";
import createTestingData from "../../utils/testData/createTestingData.js";
import { nonEncryptedUsers } from "../../utils/testData/users.js";

// Tested modules
const app = await import("../../../../../app.js");

const testingJwtSecret = uuid();
const userToLogin = nonEncryptedUsers[0];
const anotherUser = nonEncryptedUsers[1];
const nonVerifiedUser = nonEncryptedUsers.find((user) => !user.verified);
const refreshToken = jwtUtils.sign({ _id: userToLogin._id }, testingJwtSecret);

describe("Integration tests for user authentication and authorizations endpoints API", () => {
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

    describe("Integration tests for POST /auth/login", () => {
        const loginRoute = `${config.server.urls.api}/${routes.auth.AUTH}/${routes.auth.LOGIN}`;
        const credentialsPayload = { email: userToLogin.email, password: userToLogin.password.content };
        it("Checks that a user can login when they provide correct credentials", async () => {
            // When
            const response = await request(appInstance).post(loginRoute).send(credentialsPayload);
            // Then
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.headers["set-cookie"]).toEqual(
                expect.arrayContaining([expect.stringContaining(config.jwt.refreshTokenKey)])
            );
            expect(response.body.data).toEqual(accessTokenDTOCheck);
        });
        it("Checks that a user can not login when they haven't verified their account", async () => {
            // Given
            const nonVerifiedPayload = { email: nonVerifiedUser.email, password: nonVerifiedUser.password.content };
            // When
            const response = await request(appInstance).post(loginRoute).send(nonVerifiedPayload);
            // Then
            expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.headers["set-cookie"]).not.toEqual(
                expect.arrayContaining([expect.stringContaining(config.jwt.refreshTokenKey)])
            );
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
        it("Checks that a user can not login when they provide incorrect credentials", async () => {
            // Given
            const incorrectPayloads = [
                { email: userToLogin.email, password: "randomPass$1" },
                { email: anotherUser.email, password: userToLogin.password.content },
                { email: "nonexistentemail@email.com", password: "password#1AS" },
            ];
            for (let i = 0; i < incorrectPayloads.length; i += 1) {
                const incorrectPayload = incorrectPayloads[i];
                // When
                const response = await request(appInstance).post(loginRoute).send(incorrectPayload);
                // Then
                expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
                expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
                expect(response.body.errorMsg).toEqual(expect.any(String));
            }
        });
        it("Checks that a user can not login when they provide invalid payloads", async () => {
            // Given
            const invalidPayloads = [
                { nonemail: userToLogin.email, password: "randomPass" },
                { email: anotherUser.email, email2: userToLogin.password.content },
                { email: "undefined", password: userToLogin.password.content },
                { email: "valid@email.com", password: "verylongpasswordthatcouldbeproblematicifnotcontrolled" },
                { email: anotherUser.email, password: { $set: { password: "newPassWord$1" } } },
            ];
            for (let i = 0; i < invalidPayloads.length; i += 1) {
                const incorrectPayload = invalidPayloads[i];
                // When
                const response = await request(appInstance).post(loginRoute).send(incorrectPayload);
                // Then
                expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
                expect(response.status).toBe(StatusCodes.BAD_REQUEST);
                expect(response.body.errorMsg).toEqual(expect.any(String));
            }
        });
    });

    describe("Integration tests for POST /auth/logout", () => {
        const logoutRoute = `${config.server.urls.api}/${routes.auth.AUTH}/${routes.auth.LOGOUT}`;
        const refreshTokenCookie = refreshToken;
        it("Checks that a user can logout", async () => {
            // When
            const response = await request(appInstance)
                .post(logoutRoute)
                .set("Cookie", [`${config.jwt.refreshTokenKey}=${refreshTokenCookie}`]);
            // Then
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.headers["set-cookie"]).toEqual(
                expect.arrayContaining([expect.stringContaining(config.jwt.refreshTokenKey)])
            );
        });
        it("Checks that a user can not logout when they haven't provided a token from which to logout", async () => {
            // When
            const response = await request(appInstance).post(logoutRoute);
            // Then
            expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.headers["set-cookie"]).not.toEqual(
                expect.arrayContaining([expect.stringContaining(config.jwt.refreshTokenKey)])
            );
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
        it("Checks that a user can not logout when they provide an incorrect cookie name", async () => {
            // When
            const response = await request(appInstance)
                .post(logoutRoute)
                .set("Cookie", [`refesh_cookie=${refreshTokenCookie}`]);
            // Then
            // Then
            expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.headers["set-cookie"]).not.toEqual(
                expect.arrayContaining([expect.stringContaining(config.jwt.refreshTokenKey)])
            );
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
    });
});
