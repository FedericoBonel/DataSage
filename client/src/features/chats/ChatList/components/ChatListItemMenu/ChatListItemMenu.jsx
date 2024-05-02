import { Link } from "react-router-dom";
import { MenuItem, ListItem, ListItemText } from "@mui/material";
import { MoreHoriz } from "@mui/icons-material";
import Menu from "@/components/actions/Menu";
import { messages, routes } from "@/utils/constants";

import propTypes from "./ChatListItemMenu.props";

/** Component of the popover menu of a chat list item with navigation to its settings and participant management */
const ChatListItemMenu = ({ chatId, showParticipantsManagement }) => {
    return (
        <Menu
            variant="iconButton"
            icon={<MoreHoriz />}
            showLabel={false}
            label={messages.chats.list.item.settings.LABEL}
        >
            <MenuItem
                disableGutters
                divider
                component={Link}
                to={`/${routes.chats.CHATS}/${chatId}/${routes.SETTINGS}`}
            >
                <ListItem component="div">
                    <ListItemText
                        primary={messages.chats.list.item.settings.chat.LABEL}
                        secondary={messages.chats.list.item.settings.chat.DESC}
                    />
                </ListItem>
            </MenuItem>
            {showParticipantsManagement && (
                <MenuItem
                    disableGutters
                    component={Link}
                    to={`/${routes.chats.CHATS}/${chatId}/${routes.chats.PARTICIPANTS}`}
                >
                    <ListItem component="div">
                        <ListItemText
                            primary={
                                messages.chats.list.item.settings.participants
                                    .LABEL
                            }
                            secondary={
                                messages.chats.list.item.settings.participants
                                    .DESC
                            }
                        />
                    </ListItem>
                </MenuItem>
            )}
        </Menu>
    );
};

ChatListItemMenu.propTypes = propTypes;

export default ChatListItemMenu;
