import { user } from "../../../../models/user/user.js";
import { chat } from "../../../../models/chat/chat.js";
import { colaborator } from "../../../../models/colaborator/colaborator.js";
import { message } from "../../../../models/message/message.js";
import { permission } from "../../../../models/permission/permission.js";
import { relatedEntityType } from "../../../../models/relatedEntityType/relatedEntityType.js";
import { notificationType } from "../../../../models/notificationType/notificationType.js";
import usersData from "./users.js";
import chatsData from "./chats.js";
import colaboratorData from "./colaborator.js";
import messagesData from "./messages.js";
import permissionsData from "./permissions.js";
import relatedEntitiesData from "./relatedEntities.js";
import notificationTypesData from "./notificationTypes.js";

/**
 * Creates testing data to be used for integration tests in the database.
 * If data exists, clears it up first before creating new ones.
 */
export default async () => {
    // Clear up database
    const countDocs = await user.countDocuments();
    if (countDocs > 0) {
        await user.deleteMany({});
        await colaborator.deleteMany({});
        await chat.deleteMany({});
        await message.deleteMany({});
        await permission.deleteMany({});
        await notificationType.deleteMany({});
        await relatedEntityType.deleteMany({});
    }
    // Create documents
    await user.create(usersData);
    await chat.create(chatsData);
    await colaborator.create(colaboratorData);
    await message.create(messagesData);
    await permission.create(permissionsData);
    await relatedEntityType.create(relatedEntitiesData);
    await notificationType.create(notificationTypesData);
};
