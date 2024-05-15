/** Checks that the access token DTO structure is followed in the object. */
export const accessTokenDTOCheck = expect.objectContaining({
    token: expect.any(String),
});
