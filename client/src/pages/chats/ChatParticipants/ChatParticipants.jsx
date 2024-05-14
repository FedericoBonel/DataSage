import { useMatch } from "react-router-dom";
import {
    Unstable_Grid2 as Grid,
    Typography,
    Card,
    CardHeader,
    CardContent,
} from "@mui/material";
import NewParticipantForm from "@/features/chats/NewParticipantForm";
import ParticipantList from "@/features/chats/ParticipantList";
import { messages, routes } from "@/utils/constants";
import { ChatParticipantsPageStyles } from "./ChatParticipants.styles";

/** Renders the chat participants management page */
const ChatParticipants = () => {
    // Get the chat id from url
    const match = useMatch(`/${routes.chats.CHATS}/:selectedChat/*`);
    const chatId = match?.params?.selectedChat;

    return (
        <Grid sx={ChatParticipantsPageStyles} container rowSpacing={4}>
            <Grid sm={12}>
                <Typography component="h1" variant="h3">
                    {messages.chats.participants.PAGE_TITLE}
                </Typography>
            </Grid>
            {/* Invite new participants form */}
            <Grid sm={12}>
                <NewParticipantForm chatId={chatId} />
            </Grid>
            {/* Participant management list */}
            <Grid sm={12}>
                <Card>
                    <CardHeader
                        title={messages.chats.participants.list.TITLE}
                        subheader={messages.chats.participants.list.SUB_TITLE}
                    />
                    <CardContent>
                        <ParticipantList chatId={chatId} />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default ChatParticipants;
