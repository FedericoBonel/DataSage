import config from "../../../config/index.js";
import connectToDB from "../../db/connect.js";
import { user } from "../../../models/user/user.js";
import { page } from "../../../models/page/page.js";
import { chat } from "../../../models/chat/chat.js";
import { colaborator } from "../../../models/colaborator/colaborator.js";
import { notification } from "../../../models/notification/notification.js";
import { notificationType } from "../../../models/notificationType/notificationType.js";
import { relatedEntityType } from "../../../models/relatedEntityType/relatedEntityType.js";
import { permission } from "../../../models/permission/permission.js";
import { message } from "../../../models/message/message.js";
import { permissions, notifications } from "../../constants/index.js";
import { logger } from "../../loggers/index.js";

/**
 * This script initializes the database schema and initial data
 */
logger.info(`Initializing database schema in ${config.node_environment} environment`);

logger.info("Initializing database schema - Connecting to database");
let dbConnection;
try {
    dbConnection = await connectToDB(config.db.url);
} catch (err) {
    logger.error("An error happened while connecting to database", err);
    process.exit(1);
}
logger.info("Initializing database schema - Connected to database");

// Create collections
logger.info("Initializing database schema - Creating collections");
await user.createCollection();
await page.createCollection();
await chat.createCollection();
await colaborator.createCollection();
await notification.createCollection();
await notificationType.createCollection();
await relatedEntityType.createCollection();
await permission.createCollection();
await message.createCollection();
logger.info("Initializing database schema - Collections created");

// Add needed data
try {
    // Create permissions
    const permissionsExist = await permission.find({
        allowedAction: { $in: [permissions.colaborator.readDocs, permissions.colaborator.writeDocs] },
    });
    if (!permissionsExist.length) {
        logger.info("Initializing database schema - Creating permissions");
        await permission.insertMany(
            Object.keys(permissions.colaborator).map((key) => ({ allowedAction: permissions.colaborator[key] }))
        );
        logger.info("Initializing database schema - Permissions created");
    } else {
        logger.info("Initializing database schema - Permissions were already created, skipping creation");
    }

    // Create related entity types
    const relatedEntityTypesExist = await relatedEntityType.find({
        name: { $in: [notifications.relatedEntities.chat] },
    });
    if (!relatedEntityTypesExist.length) {
        logger.info("Initializing database schema - Creating related entity types");
        await relatedEntityType.insertMany(
            Object.keys(notifications.relatedEntities).map((key) => ({ name: notifications.relatedEntities[key] }))
        );
        logger.info("Initializing database schema - Related entity types created");
    } else {
        logger.info("Initializing database schema - Related entity types were already created, skipping creation");
    }

    // Create notification types
    const notificationTypesExist = await notificationType.find({
        name: { $in: [notifications.types.names.chatInvitation] },
    });
    if (!notificationTypesExist.length) {
        logger.info("Initializing database schema - Creating notification types");
        await notificationType.insertMany(
            Object.keys(notifications.types.names).map((key) => ({ name: notifications.types.names[key] }))
        );
        logger.info("Initializing database schema - Notification types created");
    } else {
        logger.info("Initializing database schema - Notification types were already created, skipping creation");
    }
} catch (err) {
    logger.error("An error happened during data initialization", err);
    process.exit(1);
} finally {
    await dbConnection.disconnect();
}
process.exit();
