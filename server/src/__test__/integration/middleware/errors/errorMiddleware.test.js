import { StatusCodes } from "http-status-codes";
import request from "supertest";
import app from "../../../../../app.js";

describe("Integration tests for error handler middleware", () => {
    it("Checks for a NOT FOUND response when requesting a non existing resource", async () => {
        // Given
        const nonExistingResource = "/non-existing";
        // When
        const response = await request(app).get(nonExistingResource).send();
        // Then
        expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
        expect(response.status).toBe(StatusCodes.NOT_FOUND);
        expect(response.body.errorMsg).toBeDefined();
    });
});
