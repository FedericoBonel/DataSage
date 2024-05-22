import { jest } from "@jest/globals";
import request from "supertest";
import jwtUtils from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import config from "../../../../config/index.js";
import { routes } from "../../../../utils/constants/index.js";
import { connect, disconnect } from "../../../../utils/db/inMemory.js";
import { accessTokenDTOCheck } from "../../utils/dtos/tokens.js";
import { profileDTOCheck } from "../../utils/dtos/profiles.js";
import emailsRepositoryMock from "../../utils/mocks/repositories/emails/email.js";
import createTestingData from "../../utils/testData/createTestingData.js";
import { nonEncryptedUsers } from "../../utils/testData/users.js";

// Mocked modules
jest.unstable_mockModule("../../../../repositories/emails/emails.js", () => emailsRepositoryMock);
const emailsRepository = await import("../../../../repositories/emails/emails.js");

// Tested modules
const app = await import("../../../../../app.js");

const userToLogin = nonEncryptedUsers[0];
const anotherUser = nonEncryptedUsers[1];
const nonVerifiedUser = nonEncryptedUsers.find((user) => !user.verified);
const expRecoveryCodeUser = nonEncryptedUsers.find(
    (user) =>
        user.recoveryCode &&
        Date.now() - user.recoveryCode.createdAt.getTime() < config.accountRecovery.durationMins * 60 * 1000
);

describe("Integration tests for user authentication and authorizations endpoints API", () => {
    const appInstance = app.default;
    let refreshToken;

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
        // Sign an access token
        refreshToken = jwtUtils.sign({ _id: userToLogin._id }, config.jwt.refreshTokenSecret);
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
                { nonemail: userToLogin.email, password: "rass" },
                { email: anotherUser.email, email2: userToLogin.password.content },
                { email: "undefined", password: userToLogin.password.content },
                { email: "valid@email.com", password: "ver" },
                { email: anotherUser.email, password: { $set: { password: "newPassWord$1" } } },
                { email: { $ne: 1 }, password: userToLogin.password },
                { email: "{ $ne: 1 }", password: userToLogin.password },
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
        it("Checks that a user can logout", async () => {
            // When
            const response = await request(appInstance)
                .post(logoutRoute)
                .set("Cookie", [`${config.jwt.refreshTokenKey}=${refreshToken}`]);
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
                .set("Cookie", [`refesh_cookie=${refreshToken}`]);
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

    describe("Integration tests for GET /auth/refresh", () => {
        const refreshRoute = `${config.server.urls.api}/${routes.auth.AUTH}/${routes.auth.REFRESH}`;
        it("Checks that a user can refresh their access token when providing a valid refresh token", async () => {
            // When
            const response = await request(appInstance)
                .get(refreshRoute)
                .set("Cookie", [`${config.jwt.refreshTokenKey}=${refreshToken}`]);
            // Then
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.body.data).toEqual(accessTokenDTOCheck);
        });
        it("Checks that a user can not refresh their access token when providing a refresh token with an invalid signature", async () => {
            // Given
            const invalidToken = jwtUtils.sign({ _id: userToLogin._id }, "nonvalidsecret");
            // When
            const response = await request(appInstance)
                .get(refreshRoute)
                .set("Cookie", [`${config.jwt.refreshTokenKey}=${invalidToken}`]);
            // Then
            expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
        it("Checks that a user can not refresh an access token when not providing a refresh token", async () => {
            // When
            const response = await request(appInstance).get(refreshRoute);
            // Then
            expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
        it("Checks that a user can not refresh an access token when providing an incorrect cookie name", async () => {
            // When
            const response = await request(appInstance)
                .get(refreshRoute)
                .set("Cookie", [`refesh_cookie=${refreshToken}`]);
            // Then
            expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
        it("Checks that a user can not refresh an access token when providing an incorrect token payload", async () => {
            // Given
            const invalidTokens = [
                jwtUtils.sign({ _id: "invalid" }, config.jwt.refreshTokenSecret),
                jwtUtils.sign({ _id: "6639f9c6458c53338c05c38c" }, config.jwt.refreshTokenSecret),
                jwtUtils.sign({ _id: { $set: { password: { content: "myown" } } } }, config.jwt.refreshTokenSecret),
            ];
            for (let i = 0; i < invalidTokens.length; i += 1) {
                const invalidToken = invalidTokens[i];
                // When
                const response = await request(appInstance)
                    .get(refreshRoute)
                    .set("Cookie", [`refresh_token=${invalidToken}`]);
                // Then
                expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
                expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
                expect(response.body.errorMsg).toEqual(expect.any(String));
            }
        });
        it("Checks that a user can not refresh an access token when providing an expired refresh token", async () => {
            // Given
            const invalidTokens = [
                jwtUtils.sign({ _id: userToLogin._id }, config.jwt.refreshTokenSecret, { noTimestamp: true }),
                jwtUtils.sign(
                    { _id: userToLogin._id, iat: new Date().getTime() / 1000 - 10 },
                    config.jwt.refreshTokenSecret
                ),
            ];
            for (let i = 0; i < invalidTokens.length; i += 1) {
                const invalidToken = invalidTokens[i];
                // When
                const response = await request(appInstance)
                    .get(refreshRoute)
                    .set("Cookie", [`refresh_token=${invalidToken}`]);
                // Then
                expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
                expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
                expect(response.body.errorMsg).toEqual(expect.any(String));
            }
        });
    });

    describe("Integration tests for POST /auth/singup", () => {
        const verificationLink = "https://example.com/account/verify";
        const signupRoute = `${config.server.urls.api}/${routes.auth.AUTH}/${routes.auth.SIGNUP}?verificationLink=${verificationLink}`;
        const newUser = { email: "valid@example.com", password: "valid$Pass1", names: "names", lastnames: "lastnames" };
        it("Checks that a user can signup to the system", async () => {
            // When
            const response = await request(appInstance).post(signupRoute).send(newUser);
            // Then
            expect(response.status).toBe(StatusCodes.CREATED);
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.body.data).toEqual(profileDTOCheck);
            expect(response.body.data.names).toBe(newUser.names);
            expect(response.body.data.lastnames).toBe(newUser.lastnames);
            expect(response.body.data.email).toBe(newUser.email);
            expect(emailsRepository.default.saveVerificationEmail).toHaveBeenCalledTimes(1);
        });
        it("Checks that a user can not signup when providing an email that is already used by another verified user", async () => {
            // Given
            const invalidMail = {
                email: userToLogin.email,
                password: "valid$Pass1",
                names: "names",
                lastnames: "lastnames",
            };
            // When
            const response = await request(appInstance).post(signupRoute).send(invalidMail);
            // Then
            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.body.errorMsg).toEqual(expect.any(String));
            expect(emailsRepository.default.saveVerificationEmail).not.toHaveBeenCalled();
        });
        it("Checks that a user can not sign up when providing invalid data", async () => {
            // Given
            const invalidUsers = [
                {
                    email: "invalidemail.com",
                    password: "valid$Pass1",
                    names: "names",
                    lastnames: "lastnames",
                },
                {
                    email: { $set: { email: userToLogin.email } },
                    password: "valid$Pass1",
                    names: "names",
                    lastnames: "lastnames",
                },
                {
                    password: "valid$Pass1",
                },
                {
                    email: "inval@idemail.com",
                    password: "unsecurepass",
                    names: "names",
                    lastnames: "lastnames",
                },
                {
                    email: "invalidemail.com",
                    password: "unsecurepass",
                    names: 123,
                    lastnames: false,
                },
            ];
            for (let i = 0; i < invalidUsers.length; i += 1) {
                const invalidUser = invalidUsers[i];
                // When
                const response = await request(appInstance).post(signupRoute).send(invalidUser);
                // Then
                expect(response.status).toBe(StatusCodes.BAD_REQUEST);
                expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
                expect(response.body.errorMsg).toEqual(expect.any(String));
                expect(emailsRepository.default.saveVerificationEmail).not.toHaveBeenCalled();
            }
        });
    });

    describe("Integration tests for POST /auth/verify", () => {
        const verificationCode = nonVerifiedUser.verificationCode;
        const verifyRoute = `${config.server.urls.api}/${routes.auth.AUTH}/${routes.auth.VERIFY}?verificationCode=${verificationCode}`;
        it("Checks that a user can verify their account", async () => {
            // When
            const response = await request(appInstance).post(verifyRoute);
            // Then
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.body.data).toEqual(profileDTOCheck);
            expect(response.body.data.names).toBe(nonVerifiedUser.names);
            expect(response.body.data.lastnames).toBe(nonVerifiedUser.lastnames);
            expect(response.body.data.email).toBe(nonVerifiedUser.email);
        });
        it("Checks that a user can not verify their account when providing a non existent code", async () => {
            // Given
            const nonExisentCode = "neverexists";
            const nonExistant = `${config.server.urls.api}/${routes.auth.AUTH}/${routes.auth.VERIFY}?verificationCode=${nonExisentCode}`;
            // When
            const response = await request(appInstance).post(nonExistant);
            // Then
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
        it("Checks that a user can not verify their account when providing an invalid code", async () => {
            // Given
            const invalidCodes = ["short", ""];
            for (let i = 0; i < invalidCodes.length; i += 1) {
                const invalidCode = invalidCodes[i];
                const invalidRoute = `${config.server.urls.api}/${routes.auth.AUTH}/${routes.auth.VERIFY}?verificationCode=${invalidCode}`;
                // When
                const response = await request(appInstance).post(invalidRoute);
                // Then
                expect(response.status).toBe(StatusCodes.BAD_REQUEST);
                expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
                expect(response.body.errorMsg).toEqual(expect.any(String));
            }
        });
        it("Checks that a user can not verify their account when not providing a code", async () => {
            const invalidRoute = `${config.server.urls.api}/${routes.auth.AUTH}/${routes.auth.VERIFY}?verCode=codethatcouldbevalid`;
            // When
            const response = await request(appInstance).post(invalidRoute);
            // Then
            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
    });

    describe("Integration tests for POST /auth/recover", () => {
        const recoveryLink = "http://example.com/auth/recover";
        const userEmail = { email: userToLogin.email };
        const recoverRoute = `${config.server.urls.api}/${routes.auth.AUTH}/${routes.auth.RECOVER}?recoveryLink=${recoveryLink}`;
        it("Checks that a user can generate a recovery email", async () => {
            // When
            const response = await request(appInstance).post(recoverRoute).send(userEmail);
            // Then
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.body.data).not.toBeDefined();
            expect(emailsRepository.default.saveRecoveryEmail).toHaveBeenCalledTimes(1);
        });
        it("Checks that a non existant email does not throw error when generating recovery emails", async () => {
            // Given
            const nonExistentMail = { email: "nonexistent@example.com" };
            // When
            const response = await request(appInstance).post(recoverRoute).send(nonExistentMail);
            // Then
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.body.data).not.toBeDefined();
            expect(emailsRepository.default.saveRecoveryEmail).not.toHaveBeenCalled();
        });
        it("Checks that a user can not send a recovery account email when providing an invalid recovery link", async () => {
            // Given
            const invalidLinks = [
                "noprotocol.com",
                "nonexistentprotcol://example.com",
                "justdomain",
                "http://givesqueryparams.com?query=isDefined",
            ];
            for (let i = 0; i < invalidLinks.length; i += 1) {
                const invalidCode = invalidLinks[i];
                const invalidRoute = `${config.server.urls.api}/${routes.auth.AUTH}/${routes.auth.RECOVER}?recoveryLink=${invalidCode}`;
                // When
                const response = await request(appInstance).post(invalidRoute).send(userEmail);
                // Then
                expect(response.status).toBe(StatusCodes.BAD_REQUEST);
                expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
                expect(response.body.errorMsg).toEqual(expect.any(String));
                expect(emailsRepository.default.saveRecoveryEmail).not.toHaveBeenCalled();
            }
        });
        it("Checks that a user can not send a recovery email when providing an invalid request payload", async () => {
            const invalidPayloads = [
                { email: "invalid.c" },
                { noemail: "nonexistentprotcol://example.com" },
                { email: "" },
                { email: { $set: { email: "myown@gmail.com" } } },
            ];
            for (let i = 0; i < invalidPayloads.length; i += 1) {
                const invalidPayload = invalidPayloads[i];
                // When
                const response = await request(appInstance).post(recoverRoute).send(invalidPayload);
                // Then
                expect(response.status).toBe(StatusCodes.BAD_REQUEST);
                expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
                expect(response.body.errorMsg).toEqual(expect.any(String));
                expect(emailsRepository.default.saveRecoveryEmail).not.toHaveBeenCalled();
            }
        });
    });

    describe("Integration tests for POST /auth/recover/credentials", () => {
        const recoveryCode = userToLogin.recoveryCode.content;
        const newPassword = { password: "newPass@1" };
        const recoverRoute = `${config.server.urls.api}/${routes.auth.AUTH}/${routes.auth.RECOVER}/${routes.auth.CREDENTIALS}?recoveryCode=${recoveryCode}`;
        it("Checks that a user can reset their credentials by providing a recovery code", async () => {
            // When
            const response = await request(appInstance).post(recoverRoute).send(newPassword);
            // Then
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.body.data).not.toBeDefined();
        });
        it("Checks that a user can not reset their credentials by providing a non existent recovery code", async () => {
            // Given
            const nonExisentCode = "neverexists";
            const nonExistant = `${config.server.urls.api}/${routes.auth.AUTH}/${routes.auth.RECOVER}/${routes.auth.CREDENTIALS}?recoveryCode=${nonExisentCode}`;
            // When
            const response = await request(appInstance).post(nonExistant).send(newPassword);
            // Then
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
        it("Checks that a user can not reset their credentials when providing an expired recovery code", async () => {
            // Given
            const expiredCode = expRecoveryCodeUser.recoveryCode.content;
            const expiredRoute = `${config.server.urls.api}/${routes.auth.AUTH}/${routes.auth.RECOVER}/${routes.auth.CREDENTIALS}?recoveryCode=${expiredCode}`;
            // When
            const response = await request(appInstance).post(expiredRoute).send(newPassword);
            // Then
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.body.errorMsg).toEqual(expect.any(String));
        });
        it("Checks that a user can not reset their credentials when providing an invalid request payload", async () => {
            const invalidPayloads = [
                { password: "weakpassword" },
                { password: "weak$password1" },
                { nopassword: "" },
                { password: { $set: { email: "myown@gmail.com" } } },
                {},
            ];
            for (let i = 0; i < invalidPayloads.length; i += 1) {
                const invalidPayload = invalidPayloads[i];
                // When
                const response = await request(appInstance).post(recoverRoute).send(invalidPayload);
                // Then
                expect(response.status).toBe(StatusCodes.BAD_REQUEST);
                expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
                expect(response.body.errorMsg).toEqual(expect.any(String));
                expect(emailsRepository.default.saveRecoveryEmail).not.toHaveBeenCalled();
            }
        });
    });
});
