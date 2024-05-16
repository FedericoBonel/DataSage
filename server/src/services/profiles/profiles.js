import profilesDTO from "../../dtos/profiles/index.js";

/**
 * Transforms the logged in user information as to how it should be exposed when reading their profile
 *
 * NOTE: Currently it only formats the user information as to how it should be exposed.
 * However, since this could change and add more business logic
 * this service layer function is defined
 * @param {*} user The logged in user
 * @returns The profile information for the logged in user
 */
const getProfile = async (user) => profilesDTO.toProfileDTO(user);

export default { getProfile };
