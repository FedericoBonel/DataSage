import { Link } from "react-router-dom";
import {
    ListItem,
    Box,
    Typography,
    Avatar,
    Link as MUILink,
} from "@mui/material";
import { api, messages } from "@/utils/constants";
import toLocaleString from "@/utils/dates/toLocaleString";
import {
    ChatMessageItemStyles,
    ChatMessageItemTopStyles,
    ChatMessageSenderStyles,
    ChatMessageSourcesStyles,
} from "./ChatMessage.styles";
import propTypes from "./ChatMessage.props.js";

/** Component that renders a single message in a chat */
const ChatMessage = ({ chatMessage }) => {
    const messageHeader = (
        <Box sx={ChatMessageItemTopStyles}>
            {/* Sender */}
            <Box sx={ChatMessageSenderStyles}>
                <Avatar />
                <Typography component="p" variant="H6">
                    {chatMessage.from === api.validation.messages.actor[0]
                        ? messages.chats.messages.actors.AI
                        : messages.chats.messages.actors.USER}
                </Typography>
            </Box>
            {/* timeStamp */}
            <Typography variant="caption">
                {toLocaleString(chatMessage.createdAt)}
            </Typography>
        </Box>
    );

    const sources = (
        <Box sx={ChatMessageSourcesStyles}>
            {chatMessage?.sources.map((source, index) => (
                <MUILink key={source._id} component={Link}>
                    {`[${index + 1}]`}
                </MUILink>
            ))}
        </Box>
    );

    return (
        <ListItem sx={ChatMessageItemStyles} component="div" divider>
            {messageHeader}
            {/* Content */}
            <Typography>{chatMessage.content}</Typography>
            {/* Sources */}
            {sources}
        </ListItem>
    );
};

ChatMessage.propTypes = propTypes;

export default ChatMessage;
