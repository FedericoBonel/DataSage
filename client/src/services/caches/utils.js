/**
 * Formats data in a mock successful response to set in a query cache.
 * @param {*} data The data the server returned
 * @returns the formatted data
 */
export const mockSuccessfulRes = (data) => ({
    success: true,
    data,
});

/**
 * Formats data in to a mock successful response to set in a query cache for paginated data as the first element.
 * Useful for when there is data sorted by date of creation.
 * @param {{pages: [*], pageParams: [*]}} oldData Old paginated data
 * @param {*} newItem The new item to add to the first page in the first position.
 */
export const mockSuccessfulPaginatedRes = (oldData, newItem) => {
    const formattedFirstPage = oldData.pages[0]
        ? mockSuccessfulRes([newItem, ...oldData.pages[0].data])
        : mockSuccessfulRes([newItem]);

    return {
        ...oldData,
        pages: oldData.pages.map((page, i) =>
            i === 0 ? formattedFirstPage : page
        ),
    };
};

/**
 * Inserts the new item in the first page as the first item.
 * Useful for when there is data sorted by date of creation and you need to update the cache with received server data.
 * @param {{pages: [*], pageParams: [*]}} oldData Old paginated data
 * @param {*} newItem The new item to add to the first page in the first position.
 */
export const insertInFirstPage = (oldData, newItem) => {
    const formattedFirstPage = {
        ...oldData.pages[0],
        data: [newItem, ...oldData.pages[0].data],
    };

    return {
        ...oldData,
        pages: oldData.pages.map((page, i) =>
            i === 0 ? formattedFirstPage : page
        ),
    };
};
