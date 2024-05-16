import request from "supertest";
import { StatusCodes } from "http-status-codes";
import config from "../../../../config/index.js";
import { routes } from "../../../../utils/constants/index.js";
import { connect, disconnect } from "../../../../utils/db/inMemory.js";
import { createCommonAuthHeaders } from "../../utils/headers/index.js";
import createTestingData from "../../utils/testData/createTestingData.js";
import users from "../../utils/testData/users.js";
import { profileDTOCheck } from "../../utils/dtos/profiles.js";

// Tested modules
const app = await import("../../../../../app.js");

const loggedInUser = users[0];

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
});
