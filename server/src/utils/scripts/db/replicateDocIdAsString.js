import config from "../../../config/index.js";
import connectToDB from "../../db/connect.js";
import { page } from "../../../models/page/page.js";
import { logger } from "../../loggers/index.js";

/** Script that copies over the reference of a document id as a string in the pages to documentStr. */

if (config.node_environment !== "development") {
    logger.warn("The node environment is not set to development, exiting early.");
    process.exit(); // Only run in development mode
}

logger.info("Replicating documents ids as strings in all pages - Connecting to database");

await connectToDB(config.db.url);

logger.info("Replicating documents ids as strings in all pages - Connected to database");

// Copy over the document id in each page as a string into documentStr
const res = await page.updateMany({}, [{ $set: { documentStr: { $convert: { input: "$document", to: "string" } } } }]);

logger.info(`Replicating documents ids as strings in all pages - Modified ${res.modifiedCount} pages`);

process.exit();
