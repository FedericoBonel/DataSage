import { jest } from "@jest/globals";

const qAChainObjectMock = {
    invoke: jest.fn(() =>
        Promise.resolve({
            text: "Hello there! How can I help you today?",
            sourceDocuments: [
                {
                    pageContent: "This is the content of the chunk",
                    metadata: {
                        _id: "661b53ac0e4f9aaf2a83d814",
                        locationPage: 1,
                        document: "661b53ac0e4f9aaf2a83d814",
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    },
                },
            ],
        })
    ),
};

const getQAChainDefaultMock = {
    default: jest.fn(() => qAChainObjectMock),
};

export { qAChainObjectMock, getQAChainDefaultMock };
