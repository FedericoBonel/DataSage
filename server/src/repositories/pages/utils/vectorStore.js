import { getEmbeddings, VectorStore, getRerankerRetrieverFrom } from "../../../lib/langchain.js";
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

/**
 * Gets the retreiver to be used to retrieve the most relevant document pages from the vector store being used in the application
 * from a MongoDB filter.
 *
 * Basically, it calls the function given by the vector store being used to get the most relevant documents
 * based on the similarity function it provides (currently cosine similarity). 
 * Passes them to an AI model that is trained on ranking contents based on semantic meaning, reordering the documents 
 * from the vector store by relevance and returning only a top amount.
 *
 * This top most relevant documents can then be passed down to the LLM to generate a response or do whatever else. 
 * Improving overall results.
 * 
 * @param {Number} topN The number of documents to be returned by the retriever when invoked.
 * @param {{preFilter: Object.<string, *>}} filter The filter to be used in the mongodb vector search. Usefull to filter by documents id.
 * @returns The retriever to be used to get the most relevant pages stored currently in the vector store (database).
 */
const getPagesRetrieverFor = (topN, filter) => {
    const vectorStoreInstance = new VectorStore(getEmbeddings(), {
        collection: page.collection,
        indexName: vectorIndex.NAME,
        embeddingKey: vectorIndex.INDEXED_FIELD,
        textKey: vectorIndex.EMBEDDED_CONTENT_FIELD,
    });

    const vectorStoreRetriever = vectorStoreInstance.asRetriever({
        k: topN * 5,
        filter,
    });

    return getRerankerRetrieverFrom(vectorStoreRetriever, topN);
};
export { insertPagesIntoVectorStore, getPagesRetrieverFor };
