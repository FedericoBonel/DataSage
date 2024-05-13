import { Box, Typography, Divider } from "@mui/material";
import DataSageLogo from "@/assets/profilepicture.svg";
import { messages } from "@/utils/constants";
import {
    ChatWelcomeWrapperStyles,
    ChatWelcomeImageStyles,
} from "./ChatWelcome.styles";

/** Renders the chat welcome message to be shown when no messages have been sent or received. */
const ChatWelcome = () => {
    return (
        <Box sx={ChatWelcomeWrapperStyles}>
            <Box
                component="img"
                src={DataSageLogo}
                loading="lazy"
                sx={ChatWelcomeImageStyles}
            />
            <Typography variant="h4">
                {messages.chats.messages.welcome.WELCOME}
            </Typography>
            <Typography variant="h5">
                {messages.chats.messages.welcome.SUB_HEADER}
            </Typography>
            <Divider variant="fullWidth" orientation="horizontal" flexItem>
                {messages.chats.messages.welcome.NOTES_HEADER}
            </Divider>
            <Typography variant="caption">
                {messages.chats.messages.welcome.QUESTIONS_WILL_ANSWER}
            </Typography>
            <Typography variant="caption">
                {messages.chats.messages.welcome.IMPORTANT_NOTES}
            </Typography>
            <Typography variant="caption">
                {messages.chats.messages.welcome.QUESTIONS_WONT_ANSWER}
            </Typography>
        </Box>
    );
};

export default ChatWelcome;
