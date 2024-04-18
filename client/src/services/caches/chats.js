// Name of the main chats cache
const CHATS_CACHE = "chats";

/**
 * Factory to create chats cache keys.
 * @namespace
 */
const chatsCache = Object.freeze({
    /**
     * @type {Array<string>} Main chat cache. This affects all chats.
     */
    all: [CHATS_CACHE],
    /**
     * Returns the cache key for all chat lists.
     * @returns {Array<string>} The key for all chat lists.
     */
    lists: () => [...chatsCache.all, "list"],
    /**
     * Returns the cache key for a specific chat list.
     *
     * @param {Object} args Parameters by which to get the list of chats
     * @param {string} args.ownership Filters list by owned chats or shared chats.
     * @param {string} args.textSearch Text by which to search chats.
     * @returns {Array<string|Object>} The cache key for these parameters.
     */
    list: ({ textSearch, ownership }) => [
        ...chatsCache.lists(),
        { textSearch, ownership },
    ],
    /**
     * Returns the cache key that affects all chats by ids cahes.
     * @returns {Array<string>} The key of all chats by ids cahes.
     */
    details: () => [...chatsCache.all, "detail"],
    /**
     * Returns the cache key for a specific chat by id.
     * @param {string} chatId The id of the chat.
     * @returns {Array<string>} The cache key for a specific chat by id.
     */
    detail: (chatId) => [...chatsCache.details(), chatId],
    /**
     * Returns the cache key for a chat documents list.
     * @param {string} chatId The id of the chat from which the documents are.
     * @returns {Array<string>} The key for all chat lists.
     */
    documents: (chatId) => [...chatsCache.detail(chatId), "documents"],
});

export default chatsCache;
