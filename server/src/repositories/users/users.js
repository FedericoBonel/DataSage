import { user } from "../../models/user/user.js";
import { chat } from "../../models/chat/chat.js";
import { colaborator } from "../../models/colaborator/colaborator.js";
import { notification } from "../../models/notification/notification.js";

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
 * Updates a user by its id
 * @param {*} updates Updates to be applied to the user
 * @param {String} userId The id of the user to be updated
 */
const updateById = async (updates, userId) => {
    // Update the user
    const oldUser = await user.findByIdAndUpdate(userId, updates).lean();

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

export default { getById, getByEmail, updateById };
