import EntityDTO from "../../utils/EntityDTO.js";

/**
 * @openapi
 * components:
 *   schemas:
 *     MessageSourceOutputDTO:
 *       description: This is how chat message sources data will be formatted and exposed to the web for you to use.
 *       allOf:
 *         - $ref: '#/components/schemas/EntityDTO'
 *         - type: Object
 *           required:
 *             - content
 *             - locationPage
 *             - document
 *           properties:
 *             content:
 *               type: string
 *               description: The text content that the AI used to generate the response.
 *               example: The different types of beverages that we offer are soda, beer, wine...
 *             locationPage:
 *               type: number
 *               description: The page number in which the content can be found.
 *               example: 20
 *             document:
 *               type: string
 *               description: Identifier of the document where this content in that page number can be found.
 *               example: 65154ed674410acd535bc0d3
 */
export default class MessageSourceOutputDTO extends EntityDTO {
    /**
     * The text content that the AI used to generate the response
     * @type {string}
     */
    content;

    /**
     * The page number in which the content can be found
     * @type {number}
     */
    locationPage;

    /**
     * Identifier of the document where this content in that page number can be found
     * @type {string}
     */
    document;
}