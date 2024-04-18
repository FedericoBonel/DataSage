import { Link } from "react-router-dom";
import { MenuItem, ListItem, ListItemText } from "@mui/material";
import { MoreHoriz } from "@mui/icons-material";
import { Menu } from "@/components/actions";
import { messages, routes } from "@/utils/constants";

import propTypes from "./ChatListItemMenu.props";

/** Component of the popover menu of a chat list item with navigation to its settings and participant management */
const ChatListItemMenu = ({ chatId }) => {
    return (
        <Menu
            variant="iconButton"
            icon={<MoreHoriz />}
            showLabel={false}
            label={messages.chats.list.SETTINGS_LABEL}
        >
            <MenuItem
                disableGutters
                divider
                component={Link}
                to={`/${routes.chats.CHATS}/${chatId}/${routes.SETTINGS}`}
            >
                <ListItem component="div">
                    <ListItemText
                        primary={"Settings"}
                        secondary={"Change chat name, files or delete it"}
                    />
                </ListItem>
            </MenuItem>
            <MenuItem
                disableGutters
                component={Link}
                to={`/${routes.chats.CHATS}/${chatId}/${routes.chats.PARTICIPANTS}`}
            >
                <ListItem component="div">
                    <ListItemText
                        primary={"Manage Participants"}
                        secondary={"Update who can access your chat"}
                    />
                </ListItem>
            </MenuItem>
        </Menu>
    );
};

ChatListItemMenu.propTypes = propTypes;

export default ChatListItemMenu;