import DocumentOutputDTO from "./DocumentOutputDTO.js";

/**
 * Transforms a document as it is stored in the database to how it should be exposed.
 * @param {*} document The document as it is stored in the database.
 * @param {string} url The signed url to access the document in the cloud store.
 */
const toDocumentOutputDTO = (document, url) => {
    const docDTO = new DocumentOutputDTO();
    docDTO._id = document._id;
    docDTO.name = document.name;
    docDTO.url = url;
    docDTO.createdAt = document.createdAt?.toISOString();
    return docDTO;
};

export { toDocumentOutputDTO };
