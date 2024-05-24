// Name of the main user profile cache
const PROFILE_CACHE = "profile";

/**
 * Factory to create profile cache keys.
 * @namespace
 */
const profileCache = Object.freeze({
    /**
     * @type {Array<string>} Main profile cache. This affects all user profile information.
     */
    all: [PROFILE_CACHE],
    /**
     * Returns the cache key for the logged in user profile information.
     * @returns {Array<string>} The key for the logged in user profile information.
     */
    profile: () => [...profileCache.all],
});

export default profileCache;
