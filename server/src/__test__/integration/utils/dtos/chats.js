/** Checks that the chat excerpt DTO structure is followed in the object. */
export const chatExcerptDTOCheck = expect.objectContaining({
    _id: expect.any(String),
    createdAt: expect.any(String),
    name: expect.any(String),
    isOwner: expect.any(Boolean),
    owner: {
        _id: expect.any(String),
        names: expect.any(String),
        lastnames: expect.any(String),
    },
});

/** Checks that the chat Details DTO structure is followed in the object. */
export const chatDetailDTOCheck = expect.objectContaining({
    _id: expect.any(String),
    createdAt: expect.any(String),
    name: expect.any(String),
    isOwner: expect.any(Boolean),
    owner: {
        _id: expect.any(String),
        names: expect.any(String),
        lastnames: expect.any(String),
    },
});
