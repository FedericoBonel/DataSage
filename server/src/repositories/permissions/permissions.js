import { permission } from "../../models/permission/permission.js";

/**
 * Gets all permissions that contain at least one of the provided list of allowed actions.
 *
 * Since the allowed action of a permission is unique, this will return the same length of results as the input array if all actions are present.
 * @param {Array.<string>} allowedActions The list of allowed actions to filter by.
 * @returns The permissions that match at least one of the allowed actions.
 */
const getByAllowedActions = async (allowedActions) =>
    permission.find({ allowedAction: { $in: allowedActions } }).lean();

export default { getByAllowedActions };
