import config from "../../../config/index.js";
import connectToDB from "../../db/connect.js";
import { page } from "../../../models/page/page.js";

/** Script that copies over the reference of a document id as a string in the pages to documentStr. */

if (config.node_environment !== "development") {
    process.exit(); // Only run in development mode
}

await connectToDB(config.db.url);

// Copy over the document id in each page as a string into documentStr
await page.updateMany({}, [{ $set: { documentStr: { $convert: { input: "$document", to: "string" } } } }]);

process.exit();
