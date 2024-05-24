/** Contains all auth related validation values to be used in the application. */
export default Object.freeze({
    /** Validation variables related to verification urls */
    verificationUrl: {
        /** Maximum length of a registration verification url */
        MAX_LENGTH: 512,
    },
    /** Validation variables related to recovery urls */
    recoveryUrl: {
        /** Maximum length of an account recovery url */
        MAX_LENGTH: 512,
    },
    /** Validation variables related to verification codes */
    verificationCode: {
        /** Minimum length of a verification code */
        MIN_LENGTH: 8,
        /** Maximum length of a verification code */
        MAX_LENGTH: 255,
    },
    /** Validation variables related to recovery codes */
    recoveryCode: {
        /** Minimum length of a recovery code */
        MIN_LENGTH: 8,
        /** Maximum length of a recovery code */
        MAX_LENGTH: 255,
    },
});
