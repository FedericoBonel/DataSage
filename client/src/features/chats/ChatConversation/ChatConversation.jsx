import { Box } from "@mui/material";
import chatsServices from "@/services/chats";
import ChatMessageList from "../ChatMessageList";
import ChatMessageForm from "./components/ChatMessageForm/ChatMessageForm";
import { ChatConversationWrapperStyles } from "./ChatConversation.styles";
import propTypes from "./ChatConversation.props";

/** Renders the complete chat (history and chat message sending form) for a specific chat by id. */
const ChatConversation = ({ chatId }) => {
    const sendMessageQuery = chatsServices.useSendMessageToChat();

    const onSubmitMessage = (message) => {
        sendMessageQuery.mutate({ chatId, message });
    };

    return (
        <Box sx={ChatConversationWrapperStyles}>
            <ChatMessageList
                chatId={chatId}
                isResponding={sendMessageQuery.isPending}
            />
            <ChatMessageForm
                onSend={onSubmitMessage}
                disabled={sendMessageQuery.isPending}
            />
        </Box>
    );
};

ChatConversation.propTypes = propTypes;

export default ChatConversation;
