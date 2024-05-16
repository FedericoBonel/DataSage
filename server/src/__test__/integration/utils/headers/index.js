import jwtUtils from "jsonwebtoken";
import config from "../../../../config/index.js";

/**
 * Returns common headers for all endpoints that require authentication.
 * 
 * NOTE: This should be called in a before each AFTER testing data initialization to avoid getting tokens that are expired or invalid.
 * @param {{_id: string}} userToAuthorize The user to be authenticated in the header.
 * @returns An object with all required headers for authenticated enpoints.
 */
export const createCommonAuthHeaders = (userToAuthorize) => ({
    Authorization: `Bearer ${jwtUtils.sign({_id: userToAuthorize._id}, config.jwt.accessTokenSecret)}`,
});
