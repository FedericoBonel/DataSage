import { useMatch } from "react-router-dom";
import { Unstable_Grid2 as Grid, Typography } from "@mui/material";
import UpdateChatForm from "@/features/chats/UpdateChatForm";
import AddDocumentsForm from "@/features/chats/AddDocumentsForm";
import DocumentList from "@/features/chats/DocumentList";
import DeleteChatForm from "@/features/chats/DeleteChatForm";
import { messages, routes } from "@/utils/constants";
import { UpdateChatFormContainerStyles } from "./ChatSettings.styles";
import ChatFileSection from "./components/ChatFilesSection/ChatFileSection";

/** Component that renders the settings page for a chat. */
const ChatSettings = () => {
    // Get the chat id from url
    const match = useMatch(`/${routes.chats.CHATS}/:selectedChat/*`);
    const chatId = match?.params?.selectedChat;

    return (
        <Grid sx={UpdateChatFormContainerStyles} container rowSpacing={4}>
            <Grid sm={12}>
                <Typography component="h1" variant="h3">
                    {messages.chats.settings.PAGE_TITLE}
                </Typography>
            </Grid>
            {/* Update chat information */}
            <Grid sm={12}>
                <UpdateChatForm chatId={chatId} />
            </Grid>
            {/* Update and manage uploaded documents */}
            <Grid sm={12}>
                <ChatFileSection>
                    <AddDocumentsForm chatId={chatId} />
                    <DocumentList chatId={chatId} />
                </ChatFileSection>
            </Grid>
            {/* Delete chat. */}
            <Grid sm={12}>
                <DeleteChatForm chatId={chatId} />
            </Grid>
        </Grid>
    );
};

export default ChatSettings;
