import { useMatch } from "react-router-dom";
import { Unstable_Grid2 as Grid } from "@mui/material";
import ChatInvitation from "@/features/chats/ChatInvitation";
import { routes } from "@/utils/constants";
import { ContainerStyles, ContainerCenterStyles } from "./JoinChat.styles";

/** Renders the join chat page for a chat participant */
const JoinChat = () => {
    // Get the chat id from url
    const match = useMatch(`/${routes.chats.CHATS}/:selectedChat/*`);
    const chatId = match?.params?.selectedChat;

    return (
        <Grid container sx={ContainerStyles}>
            <Grid xs sx={ContainerCenterStyles}>
                <ChatInvitation chatId={chatId} />
            </Grid>
        </Grid>
    );
};

export default JoinChat;
