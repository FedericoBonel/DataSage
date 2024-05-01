import propTypes from "prop-types";
import NotificationDTO from "@/dtos/notifications/NotificationDTO";

export default {
    /** The notification to be shown in the item. */
    notification: propTypes.shape(NotificationDTO).isRequired,
    /** The function to be executed when the notification delete button is clicked. It receives the notification id in the first parameter and the notification type in the second. */
    onDelete: propTypes.func.isRequired,
    /** The function to be executed when the notification is clicked. It receives the notification id. */
    onClick: propTypes.func.isRequired,
};
