import { insertPagesIntoVectorStore } from "./utils/vectorStore.js";

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

export default { saveAll };