import { Typography } from "@mui/material";
import { api, messages, routes } from "@/utils/constants";
import toLocaleString from "@/utils/dates/toLocaleString";
import {
    NotificationBoldedTextStyles,
    NotificationTextStyles,
} from "./NotificationListItem.styles";

/**
 * Transforms a notification as it is received as to how it should be showed
 * @param {*} notification Notification as it is received from back end
 * @returns The notification to be shown in the NotificationListItem component
 */
const toNotificationItem = (notification) => {
    switch (notification.type) {
        case api.validation.notifications.types.CHAT_INVITATION:
            return {
                primary: (
                    <>
                        <Typography
                            sx={NotificationBoldedTextStyles}
                        >{`${notification.from.names} ${notification.from.lastnames}`}</Typography>
                        <Typography sx={NotificationTextStyles}>
                            {" "}
                            {
                                messages.notifications.list.item.chatInvitation
                                    .PRIMARY_CONNECTOR
                            }{" "}
                        </Typography>
                        <Typography sx={NotificationBoldedTextStyles}>
                            {
                                messages.notifications.list.item.chatInvitation
                                    .PRIMARY_SUBJECT
                            }{" "}
                        </Typography>
                    </>
                ),
                secondary: `${
                    messages.notifications.list.item.chatInvitation
                        .SECONDARY_PREFIX
                } ${toLocaleString(notification.createdAt)}`,
                href: `/${routes.chats.CHATS}/${notification.relatedEntity._id}/${routes.chats.JOIN}`,
            };
        default:
            throw new Error(`Unknown notification type "${notification.type}"`);
    }
};

export default toNotificationItem;
