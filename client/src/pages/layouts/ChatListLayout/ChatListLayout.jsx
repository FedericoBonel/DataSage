import { Outlet, useMatch } from "react-router-dom";
import { Box } from "@mui/material";
import { routes } from "@/utils/constants";
import ChatListContainer from "./components/ChatListContainer/ChatListContainer";
import { ChatList } from "@/features/chats";

/** The layout that provides a list of chats to subroutes. */
const ChatListLayout = () => {
    // Get the selected chat id from url
    const match = useMatch(`/${routes.chats.CHATS}/:selectedChat`);
    const selectedChat = match?.params?.selectedChat;

    return (
        <Box sx={{ display: "flex" }}>
            <ChatListContainer>
                <ChatList selectedChat={selectedChat} />
            </ChatListContainer>
            <Box sx={{ flexGrow: 1 }}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default ChatListLayout;
