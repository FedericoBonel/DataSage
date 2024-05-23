const decisionMessages = {
    /** Contains the message to be shown to the user to describe the action of submitting something. */
    SUBMIT: "Submit",
    /** Contains the message to be shown to the user to describe the action of removing something. */
    REMOVE: "Remove",
    /** Contains the message to be shown to the user to describe the action of deleting something. */
    DELETE: "Delete",
    /** Contains the message to be shown to the user to describe the action of canceling something. */
    CANCEL: "Cancel",
    /** Contains the message to be shown to the user to describe the action of accepting something. */
    ACCEPT: "Accept",
    /** Contains the message to be shown to the user to describe the action of joining something. */
    JOIN: "Join",
    /** Contains the message to be shown to the user to describe the action of signing up to the application */
    SIGNUP: "Sign Up",
    /** Contains the message to be shown to the user to describe the action of signing in to the application */
    SIGNIN: "Sign In",
    /** Contains the message to be shown to the user to describe the action of signing out of the application */
    SIGNOUT: "Sign Out",
    /** Contains the message to be shown to the user to describe the action of recovering an account */
    RECOVER: "Recover account",
};

export default Object.freeze({
    /** Contains all messages of actions the user can take related to lists pagination */
    pagination: {
        /** Contains the message to be shown to the user to describe the action of loading more pages. */
        LOAD_MORE: "Load more items",
    },
    /** Contains all messages of actions the user can take in forms. */
    form: {
        /** Contains the message to be shown to the user to describe the action of submiting a form. */
        SUBMIT: decisionMessages.SUBMIT,
        /** Contains the message to be shown to the user to describe the action of canceling the submition of a form. */
        CANCEL: decisionMessages.CANCEL,
    },
    /** Contains all GENERAL messages of decisions the user can take in the application (Normally default labels of components, etc.). */
    decision: decisionMessages,
    /** Contains all messages to be shown to the user on delete forever form fields. */
    deleteForever: {
        /** Contains all messages to be shown to the user on confirmation of delete forever actions. */
        confirmation: {
            /** Label of the field where that the user needs to fill to confirm deletion */
            FIELD_LABEL: "Confirm deletion",
            /** Value that has to be filled up by the user to confirm deletion */
            VALUE: "delete forever",
            /** Label of the button that confirms the delete action. */
            BUTTON_LABEL: "delete forever",
            /**
             * Generates the helper text for the field that has to be filled up by the user to confirm deletion.
             * @param {string} confirmationValue Value the user has to fill up in the field to confirm deletion.
             * @returns The message to be shown in the helper text of the field the user has to fill up to confirm deletion.
             */
            generateHelperText: (confirmationValue) =>
                `Insert "${confirmationValue}" to confirm deletion.`,
        },
    },
});
