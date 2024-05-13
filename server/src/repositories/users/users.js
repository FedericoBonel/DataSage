import { user } from "../../models/user/user.js";

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

export default { getById, getByEmail };
