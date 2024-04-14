/**
 * Transforms and formats a hashtable of pages organized by document
 * names and an array of saved documents in database into an array of pages
 * with their corresponding document id asigned in their value "object" TO STORE IN DATABASE.
 * @param {Object.<string, Array.<Object>>} pagesByDocument The hashtable where the keys are the document names and the values are the pages for that document.
 * @param {[{_id: string, name: string}]} savedDocuments The saved documents in database.
 * @return {Array.<{pageContent: string, metadata: {locationPage: number, createdAt: Date, document: string} }>} An array containing all the pages of all the documents with their corresponding documents ids assigned.
 */
const flatPagesByDocuments = (pagesByDocument, savedDocuments) => {
    const docsWithIds = {};
    savedDocuments.forEach((doc) => {
        docsWithIds[doc.name] = doc;
    });
    return Object.keys(pagesByDocument).flatMap((docName) =>
        pagesByDocument[docName].map((doc) => ({
            ...doc,
            metadata: { ...doc.metadata, document: docsWithIds[docName]._id },
        }))
    );
};

export default flatPagesByDocuments;
