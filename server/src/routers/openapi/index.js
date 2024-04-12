import { Router } from "express";
import swaggerJs from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import config from "../../config/index.js";
import { messages } from "../../utils/constants/index.js";

const router = Router();

const openAPIConfig = {
    definition: {
        failOnErrors: true,
        openapi: "3.1.0",
        info: {
            title: messages.openapi.TITLE,
            version: messages.openapi.VERSION,
            description: messages.openapi.DESC,
            license: {
                name: messages.openapi.license.NAME,
                url: messages.openapi.license.URL,
            },
            contact: {
                name: messages.openapi.contact.NAME,
                url: messages.openapi.contact.URL,
                email: messages.openapi.contact.EMAIL,
            },
        },
        servers: [
            {
                url: config.server.urls.test,
                description: messages.openapi.servers.TEST_DESC,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
                cookieAuth: {
                    type: "apiKey",
                    in: "cookie",
                    name: "jwt",
                },
            },
        },
        // TODO: Add security when implemented
        security: [],
    },
    // Files containing API Specs
    apis: ["./src/routers/**/*.js", "./src/dtos/**/*.js", "./src/utils/responsebodies/**/*.js"],
};

const openApiSpecs = swaggerJs(openAPIConfig);

/** Handles requests that require OpenAPI specs in json format */
router.route("/json").get((req, res) => res.send(openApiSpecs));

/** Returns swagger ui page with OpenAPI specs */
router.use(
    swaggerUi.serve,
    swaggerUi.setup(openApiSpecs, {
        customCssUrl: config.swagger.theme,
        swaggerOptions: { docExpansion: "none" },
    })
);

export default router;
