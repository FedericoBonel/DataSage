import bcrypt from "bcrypt";
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
import dummyUsers from "./dummydata/users.js";
import { logger } from "../../loggers/index.js";

if (config.node_environment !== "development") {
    logger.warn("The node environment is not set to development, exiting early.");
    process.exit(); // Only run in development mode
}

logger.info("Initializing testing data - Connecting to database");

await connectToDB(config.db.url);

logger.info("Initializing testing data - Connected to database");

// Create collections
await user.createCollection();
await page.createCollection();
await chat.createCollection();
await colaborator.createCollection();
await notification.createCollection();
await notificationType.createCollection();
await relatedEntityType.createCollection();
await permission.createCollection();
await message.createCollection();

logger.info("Initializing testing data - Collections created in database");

// Add user dummy data
const noAdminUsersExist = await user.findOne({ isAdmin: false }).lean();
if (!noAdminUsersExist) {
    await user.insertMany(dummyUsers);
    logger.info("Initializing testing data - Added no admin users");
}

// Check if there is an Admin already and create one for testing otherwise
const adminUserExists = await user.findOne({ isAdmin: true }).lean();
if (!adminUserExists) {
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
    logger.info("Initializing testing data - Added admin user with the provided email and password");
}

// Check if permissions have been created
const permissionsExist = await permission.find({
    allowedAction: { $in: [permissions.colaborator.readDocs, permissions.colaborator.writeDocs] },
});
if (!permissionsExist.length) {
    await permission.insertMany(
        Object.keys(permissions.colaborator).map((key) => ({ allowedAction: permissions.colaborator[key] }))
    );
    logger.info("Initializing testing data - Added permissions");
}

// Check if related entity types have been created
const relatedEntityTypesExist = await relatedEntityType.find({
    name: { $in: [notifications.relatedEntities.chat] },
});
if (!relatedEntityTypesExist.length) {
    await relatedEntityType.insertMany(
        Object.keys(notifications.relatedEntities).map((key) => ({ name: notifications.relatedEntities[key] }))
    );
    logger.info("Initializing testing data - Added related entity types for notifications");
}

// Check if notification types have been created
const notificationTypesExist = await notificationType.find({
    name: { $in: [notifications.types.names.chatInvitation] },
});
if (!notificationTypesExist.length) {
    await notificationType.insertMany(
        Object.keys(notifications.types.names).map((key) => ({ name: notifications.types.names[key] }))
    );
    logger.info("Initializing testing data - Added notification types");
}

process.exit();
