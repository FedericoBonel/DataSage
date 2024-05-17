import { Types } from "mongoose";
import { user } from "../../models/user/user.js";
import { chat } from "../../models/chat/chat.js";
import { colaborator } from "../../models/colaborator/colaborator.js";
import { notification } from "../../models/notification/notification.js";
import { page } from "../../models/page/page.js";
import { message } from "../../models/message/message.js";
import { deleteMultipleFilesInS3 } from "../../lib/amazonS3.js";

/**
 * Gets a user by its id
 * @param {String} userId The id of the user to get
 * @returns The user with that id if found, otherwise undefined
 */
const getById = async (userId) => user.findById(userId).lean();

/**
 * Gets a user by its email
 * @param {String} email The email of the user to get
 * @returns The user with that email if found, otherwise undefined
 */
const getByEmail = async (email) => user.findOne({ email }).lean();

/**
 * Saves a user in the database
 * @param {*} newUser The user to be saved in database
 * @returns The saved user
 */
const save = async (newUser) => {
    if (!newUser) throw new Error("Missing params");

    const savedUser = await user.create(newUser);

    return savedUser;
};

/**
 * Updates a user by its id
 * @param {*} updates Updates to be applied to the user
 * @param {String} userId The id of the user to be updated
 */
const updateById = async (updates, userId) => {
    if (!updates || !userId) throw new Error("Missing params");

    const formattedUpdates = { ...updates };

    if (updates.verified) {
        // If the user is getting verified, unset the current verification code
        formattedUpdates.$unset = { verificationCode: "" };
        delete formattedUpdates.verificationCode;
    }

    // Update the user
    const oldUser = await user.findByIdAndUpdate(userId, formattedUpdates).lean();

    if (!oldUser) {
        return oldUser;
    }

    // Simulate the updated user
    const updatedUser = { ...oldUser, ...updates, updatedAt: new Date() };

    // Check if the names or lastnames changed and update where it denormalizes
    if (
        (updates.names && oldUser.names !== updates.names) ||
        (updates.lastnames && oldUser.lastnames !== updates.lastnames)
    ) {
        // Update the collaborator instances
        await colaborator.bulkWrite(
            [
                {
                    // Where user participates
                    updateMany: {
                        filter: { "user._id": userId },
                        update: {
                            user: updatedUser,
                        },
                    },
                },
                {
                    // Where user is the chat owner
                    updateMany: {
                        filter: { "chat.owner._id": userId },
                        update: { "chat.owner": updatedUser },
                    },
                },
            ],
            { skipValidation: false }
        );

        // Update the user chats
        await chat.updateMany({ "owner._id": userId }, { owner: updatedUser }, { runValidators: true });

        // Update the notifications
        await notification.bulkWrite(
            [
                {
                    // The notifications the user received
                    updateMany: {
                        filter: { "to._id": userId },
                        update: { to: updatedUser },
                    },
                },
                {
                    // The notifications the user sent
                    updateMany: {
                        filter: { "from._id": userId },
                        update: { from: updatedUser },
                    },
                },
            ],
            { skipValidation: false }
        );
    } else if (updates.email && oldUser.email !== updates.email) {
        // If not check if the email changed and update where it denormalizes
        // Update where the user collaborates
        await colaborator.updateMany({ "user._id": userId }, { user: updatedUser }, { runValidators: true });
    }

    return updatedUser;
};

/**
 * Gets a user by their verification code
 * @param {String} verificationCode The verification code assigned to the user
 * @returns The user with that verification code or null if not found
 */
const getByVerificationCode = async (verificationCode) => {
    if (!verificationCode) throw new Error("Missing params");

    return user.findOne({ verificationCode }).lean();
};

/**
 * Deletes a user by id and all its information from the system (chats, collaborators, etc.).
 * This includes denormalized data.
 * @param {String} userId Id of the user being deleted
 * @returns The deleted user or null if no user was found
 */
const deleteById = async (userId) => {
    const castedId = new Types.ObjectId(userId);

    // Delete the user and verify it exists
    const deletedUser = await user.findByIdAndDelete(castedId);

    if (!deletedUser) {
        return deletedUser;
    }

    // Get the documents from the chats the user owns
    const documentsArray = await chat.aggregate().match({ "owner._id": castedId }).project({ _id: 0, documents: 1 });
    const documentsObjects = documentsArray.flatMap((item) => item.documents);
    const documentsIds = documentsObjects.map((doc) => doc._id);
    const documentsStoreIds = documentsObjects.map((doc) => doc.storeId);

    // Get the user collaborators (from the chats they own or they participate in)
    const collabsArray = await colaborator
        .aggregate()
        .match({ $or: [{ "user._id": castedId }, { "chat.owner._id": castedId }] })
        .project({ _id: 1 });
    const collabsIds = collabsArray.map((collab) => collab._id);

    // Delete all the pages from the chats the user owns
    if (documentsIds.length > 0) await page.deleteMany({ document: { $in: documentsIds } });

    // Delete all the messages sent by this user or any user that participates in chats owned by this user
    if (collabsIds.length > 0) await message.deleteMany({ colaborator: { $in: collabsIds } });

    // Delete all the collaborators related to this user
    if (collabsIds.length > 0)
        await colaborator.deleteMany({ $or: [{ "user._id": castedId }, { "chat.owner._id": castedId }] });

    // Delete all the chats owned by this user
    await chat.deleteMany({ "owner._id": castedId });

    // Delete all notifications sent or received by this user
    await notification.deleteMany({ $or: [{ "to._id": castedId }, { "from._id": castedId }] });

    // Delete all the documents uploaded to the chats owned by this user from the cloud store
    if (documentsStoreIds.length > 0) await deleteMultipleFilesInS3(documentsStoreIds);

    return deletedUser;
};

export default { getById, getByEmail, updateById, save, getByVerificationCode, deleteById };
