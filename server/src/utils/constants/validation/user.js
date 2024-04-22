/** Contains all user validation values to be used in the application. */
export default Object.freeze({
    names: {
        /** Minimum length of a user first and middle names */
        MIN_LENGTH: 1,
        /** Maximum length of a user first and middle names */
        MAX_LENGTH: 64,
    },
    lastnames: {
        /** Minimum length of a user last names */
        MIN_LENGTH: 1,
        /** Maximum length of a user last names */
        MAX_LENGTH: 64,
    },
    email: {
        /** Minimum length of a user email */
        MIN_LENGTH: 5,
        /** Maximum length of a user email */
        MAX_LENGTH: 254,
    },
    password: {
        /** Minimum length of a password */
        MIN_LENGTH: 8,
        /** Maximum length of a user password */
        MAX_LENGTH: 255,
    },
});
