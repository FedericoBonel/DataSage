import { user } from "../../../../models/user/user.js";
import { chat } from "../../../../models/chat/chat.js";
import { colaborator } from "../../../../models/colaborator/colaborator.js";
import usersData from "./users.js";
import chatsData from "./chats.js";
import colaboratorData from "./colaborator.js";

/**
 * Creates testing data to be used for integration tests in the database.
 */
export default async () => {
    await user.create(usersData);
    await chat.create(chatsData);
    await colaborator.create(colaboratorData);
};
