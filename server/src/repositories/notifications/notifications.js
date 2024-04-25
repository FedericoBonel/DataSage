import { notification } from "../../models/notification/notification.js";

/**
 * Saves a notification in database and returns its saved version
 * @param {*} newNotification Notification to be saved in the database
 * @returns The saved notification with an assigned id and any other automatic fields
 */
const save = (newNotification) => notification.create(newNotification);

export default { save };
