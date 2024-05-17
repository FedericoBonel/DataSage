import { jest } from "@jest/globals";

/** Default mock of amazon S3 lib module */
export default {
    default: { saveVerificationEmail: jest.fn() },
};
