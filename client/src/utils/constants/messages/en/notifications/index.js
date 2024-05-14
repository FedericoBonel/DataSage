import notificationsList from "./list";
import notificationsDelete from "./delete";

export default Object.freeze({
    /** Contains all messages to be shown in notifications listings. */
    list: notificationsList,
    /** Contains all messages to be shown in notifications deletion dialogs */
    delete: notificationsDelete,
});
