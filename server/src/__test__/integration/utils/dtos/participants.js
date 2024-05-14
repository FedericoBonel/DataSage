/** Checks that the list participant DTO structure is followed in the object. */
export const participantExcerptDTOCheck = expect.objectContaining({
    _id: expect.any(String),
    names: expect.any(String),
    lastnames: expect.any(String),
    email: expect.any(String),
    hasJoined: expect.any(Boolean),
    createdAt: expect.any(String),
});

/** Checks that the detailed participant DTO structure is followed in the object. */
export const participantDTOCheck = expect.objectContaining({
    _id: expect.any(String),
    names: expect.any(String),
    lastnames: expect.any(String),
    email: expect.any(String),
    hasJoined: expect.any(Boolean),
    permissions: expect.any(Array),
    createdAt: expect.any(String),
});
