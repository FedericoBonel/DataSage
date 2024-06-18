import config from "../../../config/index.js";

/** Contains all messages that contain openapi information to show to the user. Normally shown in the swagger-ui page */
export default Object.freeze({
    /** Title of the application to be shown in OpenAPI spec */
    TITLE: "DataSage RestAPI",
    /** Version of the application to be shown in OpenAPI spec */
    VERSION: config.server.version,
    /** Description of the application to be shown in OpenAPI spec */
    DESC: "The following RestAPI exposes the business logic of the DataSage application to create chats where conversations can be held with LLMs using custom data provided as PDF files.",
    /** License information of the application (e.g. "MIT", "Apache License 2.0") */
    license: {
        /** Name of the license */
        NAME: "MIT",
        /** Url to license boilerplate */
        URL: "https://spdx.org/licenses/MIT.html",
    },
    /** Contact information for readers of OpenAPI spec */
    contact: {
        /** Name of the contact ("Alex Smith", "Alphabet", etc.) */
        NAME:"Federico Jorge Bonel Tozzi",
        /** URL of the contact ("github.alexsmith.io", "alphabet.com") */
        URL: "https://github.com/FedericoBonel",
        /** Email of the contact ("alex@smith.com", "contact@google.com") */
        EMAIL: "bonelfederico@gmail.com",
    },
    /** OpenAPI spec accessible servers */
    servers: {
        /** Description of test server */
        TEST_DESC: "Testing server"
    }
});
