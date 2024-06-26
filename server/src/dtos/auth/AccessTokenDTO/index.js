import AccessTokenDTO from "./AccessTokenDTO.js";

/**
 * Transforms an access token as it is generated by the jwt utility into an output DTO.
 * @param {string} accessToken The token as it was generated by the jwt utility.
 * @returns The access token as it should be exposed to the web
 */
const toAccessTokenDTO = (accessToken) => {
    const dto = new AccessTokenDTO();
    dto.token = accessToken;
    return dto;
};

export { toAccessTokenDTO };
