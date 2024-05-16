/** Checks that the chat excerpt DTO structure is followed in the object. */
export const profileDTOCheck = expect.objectContaining({
    _id: expect.any(String),
    names: expect.any(String),
    lastnames: expect.any(String),
    email: expect.any(String),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
});
