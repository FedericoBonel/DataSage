/**
 * Calculates the number of entries to skip in database from page and number of items per page
 * @param {number} page Page to get data. (starts at 1).
 * @param {number} limit Number of elements per page.
 * @returns {number} The number of entries to skip in the database query from the beggining.
 */
const calculateSkip = (page, limit) => {
    if (!page || page < 1 || Number.isNaN(page) || !limit || limit < 1 || Number.isNaN(limit)) {
        throw new Error("Invalid page or limit value");
    }
    return (page - 1) * limit;
};

export default calculateSkip;
