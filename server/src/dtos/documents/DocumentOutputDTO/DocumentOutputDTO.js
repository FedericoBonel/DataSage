import EntityDTO from "../../utils/EntityDTO.js";

/**
 * @openapi
 * components:
 *   schemas:
 *     DocumentOutputDTO:
 *       description: This is how document data will be formatted and exposed to the web for you to use.
 *       allOf:
 *         - $ref: '#/components/schemas/EntityDTO'
 *         - type: Object
 *           required:
 *             - name
 *             - url
 *           properties:
 *             name:
 *               type: string
 *               description: Name of the document file.
 *               example: Fantastic Beasts and Where to Find Them.pdf
 *             url:
 *               type: string
 *               format: url
 *               description: The url to access the document itself.
 *               example: http://example.com/cdn/documents/Fantastic-Beasts-and-Where-to-Find-Them.pdf
 */
export default class DocumentOutputDTO extends EntityDTO {
    /**
     * Name of the document file
     */
    name;

    /**
     * Url to access the document itself
     */
    url;
}