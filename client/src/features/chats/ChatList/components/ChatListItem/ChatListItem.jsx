import { memo } from "react";
import { Link } from "react-router-dom";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import toLocaleString from "@/utils/dates/toLocaleString";
import { routes } from "@/utils/constants";
import { ChatListItemMenu } from "../ChatListItemMenu";
import propTypes from "./ChatListItem.props";

/** Renders a chat in a list of chats */
const ChatListItem = ({ chatItem, selected }) => {
    return (
        <ListItem
            disableGutters
            secondaryAction={<ChatListItemMenu chatId={chatItem._id} />}
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
        prevProps.chatItem.name === newProps.chatItem.name &&
        prevProps.selected === newProps.selected
);
export default memoizedComponent;
