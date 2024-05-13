/** Checks that the message DTO structure is followed in the object. */
export const messageDTOCheck = expect.objectContaining({
    _id: expect.any(String),
    from: expect.any(String),
    to: expect.any(String),
    content: expect.any(String),
    createdAt: expect.any(String),
});

/** Checks that the message source DTO structure is followed in the object. */
export const messageSourceDTOCheck = expect.objectContaining({
    _id: expect.any(String),
    content: expect.any(String),
    locationPage: expect.any(Number),
    document: expect.any(String),
});
