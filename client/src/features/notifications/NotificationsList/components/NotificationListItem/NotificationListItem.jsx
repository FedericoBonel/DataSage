import { memo } from "react";
import { Link } from "react-router-dom";
import {
    ListItem,
    ListItemButton,
    ListItemAvatar,
    Avatar,
    ListItemText,
    IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import propTypes from "./NotificationListItem.props";
import toNotificationItem from "./toNotificationItem";

/** Renders a notification in a list of notifications as it is received from the back end. */
const NotificationListItem = ({ notification, onDelete, onClick }) => {
    const formattedNotifcation = toNotificationItem(notification);

    return (
        <ListItem
            divider
            alignItems="flex-start"
            secondaryAction={
                <IconButton
                    color="error"
                    onClick={() =>
                        onDelete(notification._id, notification.type)
                    }
                >
                    <Delete />
                </IconButton>
            }
            disablePadding
        >
            <ListItemButton
                component={Link}
                to={formattedNotifcation.href}
                onClick={() => onClick(notification._id)}
            >
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

const memoizedListItem = memo(
    NotificationListItem,
    (prev, next) =>
        prev.notification._id === next.notification._id &&
        prev.notification.relatedEntity._id ===
            next.notification.relatedEntity._id &&
        prev.notification.createdAt === next.notification.createdAt &&
        prev.notification.from.names === next.notification.from.names &&
        prev.notification.from.lastnames === next.notification.from.lastnames &&
        prev.notification.type === next.notification.type &&
        prev.onDelete === next.onDelete &&
        prev.onClick === next.onClick
);

export default memoizedListItem;
