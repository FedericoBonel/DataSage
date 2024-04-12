import { parsePDFFromBuffer } from "../../../lib/langchain.js";
import { BadRequestError } from "../../../utils/errors/index.js";
import { messages } from "../../../utils/constants/index.js";

/**
 * Parses all documents sent by a user as a buffer and all metadata of the documents saved in database into pages and returns them
 * @param {Array.<{originalname: string, buffer: Buffer}>} documents Array of documents sent by the user. Each document needs a buffer property and the originalname of the file property
 * @param {Array.<{_id: String, name}>} savedDocuments Array of documents that has been saved in database. Each document needs an _id and the original file name.
 * @param {{maxPages: number}} [options] Additional configuration options to set limits. Sets the maximum number of pages allowed per document.
 * @throws { BadRequestError } If the number of pages per documents is bigger than the allowed amount
 * @returns {Promise.<Array.<{pageContent: string, metadata: {document: string, locationPage: number, createdAt: Date} }>>} An array of all pages of all documents formatted to be stored in database using a vector store.
 */
const parseDocumentsInPages = async (documents, savedDocuments, options = { maxPages: 10 }) => {
    // Store saved documents in a hashtable by name for faster lookup
    const docsWithIds = {};
    savedDocuments.forEach((doc) => {
        docsWithIds[doc.name] = doc;
    });

    const docsPages = [];
    const results = await Promise.all(
        documents.map(async (document) => {
            // Parse and split the document in pages
            const parsedPages = await parsePDFFromBuffer(document.buffer);

            // Check if the document has too many pages
            if (parsedPages.length > options.maxPages) {
                throw new BadRequestError(messages.errors.validation.document.pages.INVALID);
            }

            // Format each page and add them to the batch
            parsedPages.forEach((singlePage) => {
                const formattedPage = singlePage;
                const metadata = {
                    document: docsWithIds[document.originalname]._id,
                    locationPage: singlePage.metadata.loc.pageNumber,
                    createdAt: new Date(),
                };
                formattedPage.metadata = metadata;
                docsPages.push(formattedPage);
            });
        })
    );
    await Promise.all(results);
    return docsPages;
};

export default parseDocumentsInPages;
