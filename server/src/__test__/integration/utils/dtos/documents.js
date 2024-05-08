/** Checks that the document DTO structure is followed in the object. */
export const documentDTOCheck = expect.objectContaining({
    _id: expect.any(String),
    createdAt: expect.any(String),
    name: expect.any(String),
    url: expect.any(String),
});

/** Checks that the delete document DTO structure is followed in the object. */
export const documentDeleteDTOCheck = expect.objectContaining({
    _id: expect.any(String),
    createdAt: expect.any(String),
    name: expect.any(String),
});
