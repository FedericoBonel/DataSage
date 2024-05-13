// Name of the main chats cache
const CHATS_CACHE = "chats";
const DOCUMENTS_CACHE = "documents";
const MESSAGES_CACHE = "messages";
const PARTICIPANTS_CACHE = "participants";

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
     * @returns {Array<string>} The key for the chat documents lists.
     */
    documents: (chatId) => [...chatsCache.detail(chatId), DOCUMENTS_CACHE],
    /**
     * Returns the cache key for a chat messages list (chat history).
     * This one depends on documents because some sources could change if the documents of a chat changes.
     * @param {string} chatId The id of the chat where the messages were sent and received.
     * @returns {Array<string>} The key for the chat messages list.
     */
    messages: (chatId) => [...chatsCache.documents(chatId), MESSAGES_CACHE],
    /**
     * Returns the cache key for all the lists of chat participants for a chat.
     * @param {string} chatId The id of the chat where the participants participate.
     * @returns {Array<string>} The key for the chat participants list.
     */
    participantsLists: (chatId) => [
        ...chatsCache.detail(chatId),
        PARTICIPANTS_CACHE,
        "list",
    ],
    /**
     * Returns the cache key for a list of chat participants with filters.
     * @param {string} chatId The id of the chat where the participants participate.
     * @param {Object} args Parameters by which to get the list of participants
     * @param {string} args.textSearch Text by which to search participants.
     * @returns {Array<string>} The key for the chat participants list.
     */
    participantsList: (chatId, { textSearch }) => [
        ...chatsCache.participantsLists(chatId),
        { textSearch },
    ],
    /**
     * Returns the cache key that affects all chat participants by ids caches.
     * @param {string} chatId The id of the chat.
     * @returns {Array<string>} The key of all chats by ids cahes.
     */
    participantsDetails: (chatId) => [
        ...chatsCache.detail(chatId),
        PARTICIPANTS_CACHE,
        "detail",
    ],
    /**
     * Returns the cache key for a specific chat participant by id.
     * @param {string} chatId The id of the chat.
     * @param {string} participantId The id of the participant.
     * @returns {Array<string>} The cache key for a specific participant by id.
     */
    participantsDetail: (chatId, participantId) => [
        ...chatsCache.participantsDetails(chatId),
        participantId,
    ],
});

export default chatsCache;
