import { colaborator } from "../../models/colaborator/colaborator.js";

/**
 * Saves a new colaborator in the database for a chat and a user.
 * @param {*} newColaborator The colaborator to be saved
 * @returns The saved colaborator
 */
const save = async (newColaborator) => colaborator.create(newColaborator);

export default { save };
