import { Box, List, Typography, LinearProgress } from "@mui/material";
import { messages } from "@/utils/constants";
import ChatMessage from "../ChatMessage/ChatMessage";
import {
    ChatMessageListWrapperStyles,
    WritingResponseWrapperStyles,
    WritingResponseTextStyles,
} from "./ChatMessagelist.styles";
import propTypes from "./ChatMessageList.props";

/** Component that renders a list of chat messages (chat history) from a paginated list. */
const ChatMessageList = ({ chatMessagePages, isResponding }) => {
    const messageList = chatMessagePages.map((page) =>
        page?.data.map((msg) => <ChatMessage key={msg._id} chatMessage={msg} />)
    );

    const respondingLoader = isResponding && (
        <Box sx={WritingResponseWrapperStyles}>
            <Typography variant="caption" sx={WritingResponseTextStyles}>
                {messages.chats.messages.WRITING_RESPONSE}
            </Typography>
            <LinearProgress />
        </Box>
    );

    return (
        <>
            {respondingLoader}
            <List component="div" sx={ChatMessageListWrapperStyles}>
                {messageList}
            </List>
        </>
    );
};

ChatMessageList.propTypes = propTypes;

export default ChatMessageList;
