import settings from "./settings";
import generalInfo from "./generalInfo";
import accessInfo from "./accessInfo";

export default Object.freeze({
    /** The message to be shown as a placeholder in the account management link while the account information is being fetched from back end */
    PLACEHOLDER_MESSAGE: "Account Settings",
    /** Contains all messages to be shown in the account settings page */
    settings,
    /** Contains all messages to be shown in the account general information page section */
    generalInfo,
    /** Contains all messages to be shown in the access information page section */
    accessInfo,
});
