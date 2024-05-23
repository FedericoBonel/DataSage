import { jest } from "@jest/globals";

export default {
    insertPagesIntoVectorStore: jest.fn(),
    getPagesVectorStore: {
        asRetriever: jest.fn(),
    },
};
