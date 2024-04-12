import { user } from "../../models/user/user.js";

/**
 * Gets a user by its id
 * @param {String} userId The id of the user to get
 * @returns The user with that id if found, otherwise undefined
 */
const getById = async (userId) => user.findById(userId).lean();

export default { getById };
