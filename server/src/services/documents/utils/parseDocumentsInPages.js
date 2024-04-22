import { parsePDFFromBuffer } from "../../../lib/langchain.js";
import { BadRequestError } from "../../../utils/errors/index.js";
import { messages } from "../../../utils/constants/index.js";

/**
 * Parses all documents sent by a user as a buffer into pages and returns them in a hashtable by document name.
 *
 * NOTE: DOCUMENT NAMES NEED TO BE UNIQUE.
 * @param {Array.<{originalname: string, buffer: Buffer}>} documents Array of documents sent by the user. Each document needs a buffer property and the originalname of the file property
 * @param {{maxPages: number}} [options] Additional configuration options to set limits. Sets the maximum number of pages allowed per document.
 * @throws { BadRequestError } If the number of pages per documents is bigger than the allowed amount
 * @returns {Promise.<Object.<string, Array.<{pageContent: string, metadata: {locationPage: number, createdAt: Date} }>>>} An array of all pages of all documents formatted to be stored in database using a vector store.
 */
const parseDocumentsInPages = async (documents, options = { maxPages: 10 }) => {
    const result = {};
    const results = await Promise.all(
        documents.map(async (document) => {
            // Parse and split the document in pages
            const parsedPages = await parsePDFFromBuffer(document.buffer);

            // Check if the document has too many pages
            if (parsedPages.length > options.maxPages) {
                throw new BadRequestError(messages.errors.validation.document.pages.INVALID);
            }

            // Format each page and add them to the document look up
            parsedPages.forEach((singlePage) => {
                const formattedPage = singlePage;
                const metadata = {
                    locationPage: singlePage.metadata.loc.pageNumber,
                    createdAt: new Date(),
                };
                formattedPage.metadata = metadata;

                if (!result[document.originalname]) result[document.originalname] = [];
                result[document.originalname].push(formattedPage);
            });
        })
    );
    await Promise.all(results);
    return result;
};

export default parseDocumentsInPages;
