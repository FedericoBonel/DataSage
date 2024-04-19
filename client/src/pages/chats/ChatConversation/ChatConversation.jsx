import { useMatch } from "react-router-dom";
import { Unstable_Grid2 as Grid } from "@mui/material";
import {
    ChatDocumentViewer,
    ChatConversation as ChatConversationFeature,
} from "@/features/chats";
import {
    ConversationPageWrapperStyles,
    ChatConversationSectionStyles,
} from "./ChatConversation.styles";
import { routes } from "@/utils/constants";

/** Component that renders the chat conversation page */
const ChatConversation = () => {
    // Get the chat id from url
    const match = useMatch(`/${routes.chats.CHATS}/:selectedChat/*`);
    const chatId = match?.params?.selectedChat;

    return (
        <Grid container sx={ConversationPageWrapperStyles}>
            <Grid xs={0} md={6}>
                <ChatDocumentViewer />
            </Grid>
            <Grid xs={12} md={6} sx={ChatConversationSectionStyles}>
                <ChatConversationFeature chatId={chatId} />
            </Grid>
        </Grid>
    );
};

export default ChatConversation;
