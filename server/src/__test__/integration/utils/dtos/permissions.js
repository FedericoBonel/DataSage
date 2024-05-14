/** Checks that the detailed permissions DTO structure is followed in the object. */
export const permissionDTOCheck = expect.objectContaining({
    _id: expect.any(String),
    allowedAction: expect.any(String),
});
