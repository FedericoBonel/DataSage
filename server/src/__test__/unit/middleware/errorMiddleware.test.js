import { StatusCodes } from "http-status-codes";
import { jest } from "@jest/globals";
import errorMiddleware from "../../../middleware/errors/errorMiddleware.js";

// Mocked response object
const res = {
    status: jest.fn((status) => res),
    json: jest.fn((json) => json),
};

describe("Error middleware unit tests", () => {
    beforeEach(() => {
        // Reset all mock instances between tests
        jest.clearAllMocks();
    });

    it("tests status and json response in error handling middleware responses", () => {
        // Given
        const errors = [
            { message: "This is a test", status: StatusCodes.INTERNAL_SERVER_ERROR },
            { message: "This is a not found test", status: StatusCodes.NOT_FOUND },
        ];
        const req = {};
        errors.forEach((err, i) => {
            // When
            errorMiddleware(err, req, res);
            // Then (Check status and error message passed are correct)
            expect(res.json.mock.calls[i][0]?.errorMsg).toBe(err.message);
            expect(res.status).toHaveBeenCalledWith(err.status);
        });
    });
});
