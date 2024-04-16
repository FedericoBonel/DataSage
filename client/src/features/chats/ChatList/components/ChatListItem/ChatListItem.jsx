import { memo } from "react";
import { Link } from "react-router-dom";
import {
    ListItem,
    ListItemButton,
    ListItemText,
    IconButton,
} from "@mui/material";
import { MoreHoriz } from "@mui/icons-material";
import toLocaleString from "@/utils/dates/toLocaleString";
import propTypes from "./ChatListItem.props";
import { routes } from "@/utils/constants";

/** Renders a chat in a list of chats */
const ChatListItem = ({ chatItem, selected }) => {
    return (
        <ListItem
            disableGutters
            secondaryAction={
                <IconButton>
                    <MoreHoriz />
                </IconButton>
            }
            disablePadding
        >
            <ListItemButton
                component={Link}
                to={`/${routes.chats.CHATS}/${chatItem._id}`}
                selected={selected}
            >
                <ListItemText
                    primary={chatItem.name}
                    secondary={toLocaleString(chatItem.createdAt)}
                />
            </ListItemButton>
        </ListItem>
    );
};

ChatListItem.propTypes = propTypes;

const memoizedComponent = memo(
    ChatListItem,
    (prevProps, newProps) =>
        prevProps.chatItem._id === newProps.chatItem._id &&
        prevProps.name === newProps.name &&
        prevProps.selected === newProps.selected
);
export default memoizedComponent;
