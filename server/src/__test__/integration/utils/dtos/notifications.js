/** Checks that the notification DTO structure is followed in the object. */
export const notificationDTOCheck = expect.objectContaining({
    _id: expect.any(String),
    type: expect.any(String),
    from: {
        _id: expect.any(String),
        names: expect.any(String),
        lastnames: expect.any(String),
    },
    relatedEntity: {
        _id: expect.any(String),
        type: expect.any(String),
    },
    isRead: expect.any(Boolean),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
});

/** Checks that the notification count DTO structure is followed in the object. */
export const notificationCountDTOCheck = expect.objectContaining({
    notReadCount: expect.any(Number),
});
