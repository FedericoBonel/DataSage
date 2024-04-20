import { memo } from "react";
import { Link } from "react-router-dom";
import {
    ListItem,
    Box,
    Typography,
    Avatar,
    Link as MUILink,
} from "@mui/material";
import dataSageProfileImg from "@/assets/profilepicture.svg";
import { api, messages } from "@/utils/constants";
import toLocaleString from "@/utils/dates/toLocaleString";
import {
    ChatMessageItemStyles,
    ChatMessageItemTopStyles,
    ChatMessageSenderStyles,
    ChatMessageSourcesStyles,
    ChatMessageTextStyles,
} from "./ChatMessage.styles";
import propTypes from "./ChatMessage.props.js";

/** Component that renders a single message in a chat */
const ChatMessage = ({ chatMessage }) => {
    const isAI = chatMessage.from === api.validation.messages.actor[0]; // AI is the first actor

    const messageHeader = (
        <Box sx={ChatMessageItemTopStyles}>
            {/* Sender */}
            <Box sx={ChatMessageSenderStyles}>
                <Avatar src={isAI ? dataSageProfileImg : undefined} />
                <Typography component="p" variant="H6">
                    {isAI
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
            {chatMessage?.sources?.map((source, index) => (
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
            <Typography sx={ChatMessageTextStyles}>
                {chatMessage.content}
            </Typography>
            {/* Sources */}
            {sources}
        </ListItem>
    );
};

ChatMessage.propTypes = propTypes;

const memoizedComponent = memo(
    ChatMessage,
    (prevProps, newProps) =>
        prevProps.chatMessage._id === newProps.chatMessage._id &&
        prevProps.chatMessage.from === newProps.chatMessage.from &&
        prevProps.chatMessage.content === newProps.chatMessage.content &&
        prevProps.chatMessage.createdAt === newProps.chatMessage.createdAt
);

export default memoizedComponent;
