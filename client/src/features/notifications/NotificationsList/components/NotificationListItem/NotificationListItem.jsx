import { Link } from "react-router-dom";
import {
    ListItem,
    ListItemButton,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Typography,
    IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import toLocaleString from "@/utils/dates/toLocaleString";
import propTypes from "./NotificationListItem.props";
import {
    NotificationBoldedTextStyles,
    NotificationTextStyles,
} from "./NotificationListItem.styles";
import { routes, messages, api } from "@/utils/constants";

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

/** Renders a notification in a list of notifications as it is received from the back end. */
const NotificationListItem = ({ notification, onDelete }) => {
    const formattedNotifcation = toNotificationItem(notification);
    return (
        <ListItem
            divider
            alignItems="flex-start"
            secondaryAction={
                <IconButton color="error" onClick={onDelete}>
                    <Delete />
                </IconButton>
            }
            disablePadding
        >
            <ListItemButton component={Link} to={formattedNotifcation.href}>
                <ListItemAvatar>
                    <Avatar />
                </ListItemAvatar>
                <ListItemText
                    primary={formattedNotifcation.primary}
                    secondary={formattedNotifcation.secondary}
                />
            </ListItemButton>
        </ListItem>
    );
};

NotificationListItem.propTypes = propTypes;

export default NotificationListItem;
