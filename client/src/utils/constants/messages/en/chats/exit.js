export default {
    /** Contains all messages related to the chat exiting form */
    form: {
        /** The title of the form */
        TITLE: "Danger Zone - Exit Chat",
        /** The subtitle of the chat deletion form */
        SUB_TITLE:
            "Exiting this chat will make all its uploaded files and data unaccesible and the chat owner will be notified. This action is not reversible.",
        /** Contains all messages to be shown to the user on confirmation of exiting the chat. */
        confirmation: {
            /** Label of the field that the user needs to fill to confirm exiting */
            FIELD_LABEL: "Confirm exiting",
            /** Value that has to be filled up by the user to confirm exiting */
            VALUE: "exit chat",
            /** Label of the button that confirms the exit action. */
            BUTTON_LABEL: "Exit Chat",
            /**
             * Generates the helper text for the field that has to be filled up by the user to confirm exit.
             * @param {string} confirmationValue Value the user has to fill up in the field to confirm exit.
             * @returns The message to be shown in the helper text of the field the user has to fill up to confirm exit.
             */
            generateHelperText: (confirmationValue) =>
                `Insert "${confirmationValue}" to confirm the exit.`,
        },
    },
};
