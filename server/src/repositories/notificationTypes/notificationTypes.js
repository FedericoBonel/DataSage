import { notificationType } from "../../models/notificationType/notificationType.js";

/**
 * Gets a notification type by name
 * @param {string} name Notification type name to search for
 * @returns The notification type that has been found or undefined
 */
const getByName = async (name) => notificationType.findOne({ name }).lean();

export default { getByName };
