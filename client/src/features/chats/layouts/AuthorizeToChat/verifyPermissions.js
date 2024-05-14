/** 
 * Verifies if a user should be granted access to a chat based on permissions and ownership.
 * @param {Array.<string>} requiredPermissions An array of permissions that are required for the user to access this chat 
 * @param {Array.<{_id: string, allowedAction}>} assignedPermissions An array of all the permissions that are assigned to the user in this chat.
 * @param {boolean} isOwner Wheter or not the user is the owner of the chat or not. If true always has access.
 * @returns True if access should be allowed, false otherwise.
 */
export default (requiredPermissions, assignedPermissions, isOwner) => {
    if (isOwner) return true; // Owner always has access to everything

    const permissionsLookUp = {};

    // Set all the assigned permissions as keys on a lookup object for easy access
    assignedPermissions.forEach(
        (permission) => (permissionsLookUp[permission.allowedAction] = true)
    );

    // Check that all required permissions are assigned
    return requiredPermissions.every(
        (permission) => permissionsLookUp[permission]
    );
};
