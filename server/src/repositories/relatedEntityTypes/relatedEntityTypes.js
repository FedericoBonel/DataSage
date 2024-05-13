import { relatedEntityType } from "../../models/relatedEntityType/relatedEntityType.js";

/**
 * Gets a notification related entity type by name
 * @param {string} name The name of the related entity type to search for
 * @returns The found related entity type or null if none was found with that name
 */
const getByName = (name) => relatedEntityType.findOne({ name }).lean();

export default { getByName };
