import ReqUserDTO from "./ReqUserDTO.js";

/**
 * Transforms a user as it is stored in database as to how it should be exposed in a request object.
 * @param {*} savedUser The user as it is stored in database.
 * @returns The user as it should be exposed to an incoming request
 */
const toReqUser = (savedUser) => {
    const dto = new ReqUserDTO();
    dto._id = savedUser._id.toString();
    dto.createdAt = savedUser.createdAt;
    dto.updatedAt = savedUser.updatedAt;
    dto.names = savedUser.names;
    dto.lastnames = savedUser.lastnames;
    dto.email = savedUser.email;
    dto.verified = savedUser.verified;
    dto.isAdmin = savedUser.isAdmin;
    return dto;
};

export { toReqUser };
