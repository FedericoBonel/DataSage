import propTypes from "prop-types";
import NotificationDTO from "@/dtos/notifications/NotificationDTO";

export default {
    /** The notification to be shown in the item. */
    notification: propTypes.shape(NotificationDTO).isRequired,
    /** The function to be executed when the notification delete button is clicked. */
    onDelete: propTypes.func.isRequired,
};
