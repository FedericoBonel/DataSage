/** Contains all participant validation error messages to be used in the application. */
export default Object.freeze({
    /** Message to be shown when a user to be invited is someone that already is invited to the chat. */
    ALREADY_INVITED: "This user is already invited to the chat.",
    /** Message to be shown when a user is trying to remove themselves from a chat. */
    DELETING_ONESELF: "You cant delete your self from a chat.",
    /** Message to be shown when a user is trying to invite another one but the user with that email is non existant. */
    NON_FOUND_BY_EMAIL: "A user with this email does not exist",
});
