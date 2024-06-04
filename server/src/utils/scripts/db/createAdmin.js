import bcrypt from "bcrypt";
import config from "../../../config/index.js";
import connectToDB from "../../db/connect.js";
import { user } from "../../../models/user/user.js";
import { logger } from "../../loggers/index.js";

/**
 * This script creates the first admin user in database
 */
logger.info(`Creating admin in ${config.node_environment} environment`);

logger.info("Creating admin - Connecting to database");
let dbConnection;
try {
    dbConnection = await connectToDB(config.db.url);
} catch (err) {
    logger.error("An error happened while connecting to database", err);
    process.exit(1);
}
logger.info("Creating admin - Connected to database");

// Check if there is an Admin already and create one for testing otherwise
const adminUserExists = await user.findOne({ isAdmin: true }).lean();
if (!adminUserExists) {
    logger.info("Creating admin - Creating admin user");
    const hashedPass = await bcrypt.hash(config.server.admin.password, config.bcrypt.saltRounds);

    await user.create({
        names: "admin",
        lastnames: "admin",
        email: config.server.admin.email?.toLowerCase(),
        password: {
            content: hashedPass,
        },
        isAdmin: true,
        verified: true,
    });
    logger.info("Creating admin - Created admin user with the provided email and password");
} else {
    logger.info("Admin user already exists, exiting without creation");
}

await dbConnection.disconnect();
process.exit();