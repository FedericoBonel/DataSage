import { jest } from "@jest/globals";

/** Default mock of amazon S3 lib module */
export default {
    saveFilesInS3: jest.fn(async () => "s3ImageID"),
    getSignedURLById: jest.fn(async (fileId) => `https://example.com/${fileId}`),
    deleteFileInS3: jest.fn(async () => undefined),
    deleteMultipleFilesInS3: jest.fn(async () => undefined),
};
