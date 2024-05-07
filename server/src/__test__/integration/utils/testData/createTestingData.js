import { user } from "../../../../models/user/user.js";
import { chat } from "../../../../models/chat/chat.js";
import { colaborator } from "../../../../models/colaborator/colaborator.js";
import usersData from "./users.js";
import chatsData from "./chats.js";
import colaboratorData from "./colaborator.js";

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
    }
    // Create documents
    await user.create(usersData);
    await chat.create(chatsData);
    await colaborator.create(colaboratorData);
};
