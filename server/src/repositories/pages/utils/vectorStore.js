import { getEmbeddings, VectorStore } from "../../../lib/langchain.js";
import { page, vectorIndex } from "../../../models/page/page.js";

/**
 * @typedef {Object} PageData
 * @property {string} pageContent Textual content of the page
 * @property {{document: string, locationPage: number}} metadata Metadata to add in the vector store for each page, the id of the original document in database and the page number of this page in the document
 */

/**
 * Converts pages into vectors, inserts them into the vector store and returns it
 * @param {Array.<PageData>} pages Pages to be stored in the vector store
 * @returns Vector store where all the documents have been stored
 */
const insertPagesIntoVectorStore = async (pages) => {
    const vectorStore = await VectorStore.fromDocuments(pages, getEmbeddings(), {
        collection: page.collection,
        indexName: vectorIndex.NAME,
        embeddingKey: vectorIndex.INDEXED_FIELD,
        textKey: vectorIndex.EMBEDDED_CONTENT_FIELD,
    });

    return vectorStore;
};

export { insertPagesIntoVectorStore };
