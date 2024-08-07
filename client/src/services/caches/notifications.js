// Name of the main notifications cache
const NOTIFICATIONS_CACHE = "notifications";

/**
 * Factory to create notifications cache keys.
 * @namespace
 */
const notificationsCache = Object.freeze({
    /**
     * @type {Array<string>} Main notification cache. This affects all notifications.
     */
    all: [NOTIFICATIONS_CACHE],
    /**
     * Returns the cache key for all notifications lists.
     * @returns {Array<string>} The key for all notifications lists.
     */
    lists: () => [...notificationsCache.all, "list"],
    /**
     * Returns the cache key for a specific notification list.
     * @param {Object} filters
     * @param {boolean} filters.isRead Whether or not the cache contains read notifications or not.
     * @returns {Array<string|Object>} The cache key for this list.
     */
    list: ({ isRead }) => [...notificationsCache.lists(), { isRead }],
    /**
     * Returns the cache key for a notifications count cache
     * @returns {Array<string>} The key for the notifications count cache.
     */
    count: () => [...notificationsCache.lists(), "count"],
});

export default notificationsCache;
