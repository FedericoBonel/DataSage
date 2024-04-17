import { Outlet, useMatch } from "react-router-dom";
import { Box, Divider } from "@mui/material";
import { ChatList } from "@/features/chats";
import { routes } from "@/utils/constants";
import NewChatButton from "./components/NewChatButton/NewChatButton";
import ChatListContainer from "./components/ChatListContainer/ChatListContainer";

/** The layout that provides a list of chats to subroutes. */
const ChatListLayout = () => {
    // Get the selected chat id from url
    const match = useMatch(`/${routes.chats.CHATS}/:selectedChat`);
    const selectedChat = match?.params?.selectedChat;

    return (
        <Box sx={{ display: "flex" }}>
            <ChatListContainer>
                <NewChatButton />
                <Divider />
                <ChatList selectedChat={selectedChat} />
            </ChatListContainer>
            <Box sx={{ flexGrow: 1 }}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default ChatListLayout;
