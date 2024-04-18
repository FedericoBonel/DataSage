import { useMatch } from "react-router-dom";
import { Unstable_Grid2 as Grid, Typography } from "@mui/material";
import { UpdateChatForm } from "@/features/chats";
import { messages, routes } from "@/utils/constants";
import { UpdateChatFormContainerStyles } from "./ChatSettings.styles";

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
            <Grid sm={12}>
                <UpdateChatForm chatId={chatId} />
            </Grid>
        </Grid>
    );
};

export default ChatSettings;
