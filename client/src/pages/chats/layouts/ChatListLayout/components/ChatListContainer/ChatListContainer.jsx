import { Drawer } from "@mui/material";
import { ChatListDrawerStyles } from "./ChatListContainer.styles";
import propTypes from "./ChatListContainer.props";

/** Renders a side bar drawer for the chat list */
const ChatListContainer = ({ children }) => {
    return (
        <Drawer sx={ChatListDrawerStyles} variant="permanent" anchor="left">
            {children}
        </Drawer>
    );
};

ChatListContainer.propTypes = propTypes;

export default ChatListContainer;
