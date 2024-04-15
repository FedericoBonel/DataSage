import { insertPagesIntoVectorStore, getPagesVectorStore } from "./utils/vectorStore.js";
import { validation } from "../../utils/constants/index.js";

/**
 * @typedef {Object} PageData
 * @property {string} pageContent Textual content of the page
 * @property {{document: string, locationPage: number}} metadata Metadata to add in the vector store for each page, the id of the original document in database and the page number of this page in the document
 */

/**
 * Saves all the pages into the database as vectors and returns the vector store instance to search through them.
 * @param {Array<PageData>} pages Pages to be processed into vectors and saved in database as chat knowledge.
 * @returns The vector store instance where the pages are stored
 */
const saveAll = async (pages) => insertPagesIntoVectorStore(pages);

/**
 * Gets the page retriever to search for documents content semantically.
 * @param {Array.<string>} documents Ids of the documents for which to filter the pages by.
 * @returns The pages retriever. This can be used in chains as context providers.
 */
const getRetrieverByDocs = async (documents) =>
    getPagesVectorStore.asRetriever({
        k: validation.page.generation.MAX_TO_USE,
        filter: { preFilter: { documentStr: { $in: documents } } },
    });

export default { saveAll, getRetrieverByDocs };
