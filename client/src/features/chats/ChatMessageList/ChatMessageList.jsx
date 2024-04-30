import { useEffect } from "react";
import { Box, Typography, LinearProgress } from "@mui/material";
import { chatsServices } from "@/services/chats";
import PaginatedList from "@/components/list/PaginatedList";
import { messages } from "@/utils/constants";
import useScrollToBottom from "@/utils/hooks/useScrollToBottom";
import ChatMessage from "./components/ChatMessage/ChatMessage";
import {
    ChatMessageListStyles,
    WritingResponseWrapperStyles,
    WritingResponseTextStyles,
} from "./ChatMessagelist.styles";
import propTypes from "./ChatMessageList.props";

/** Renders a list of chat messages (chat history) for a user and a specific chat by id. */
const ChatMessageList = ({ chatId, isResponding }) => {
    const { ref: chatHistoryRef, scrollRefToBottom } = useScrollToBottom();

    const chatMessagesQuery = chatsServices.useInfiniteMessageDataByChat({
        chatId,
    });

    useEffect(() => {
        // Scroll to bottom of chat whenever a message gets generated or the page loads up
        scrollRefToBottom();
    }, [isResponding, chatMessagesQuery.isSuccess, scrollRefToBottom]);

    const messageList = chatMessagesQuery?.data?.pages?.map((page) =>
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
        <PaginatedList
            disableEndlistMessages
            isFetching={chatMessagesQuery.isLoading}
            hasNextPage={chatMessagesQuery.hasNextPage}
            isLoadingMore={chatMessagesQuery.isFetchingNextPage}
            onLoadMore={chatMessagesQuery.fetchNextPage}
            listContainerStyles={ChatMessageListStyles}
            ref={chatHistoryRef}
        >
            {respondingLoader}
            {messageList}
        </PaginatedList>
    );
};

ChatMessageList.propTypes = propTypes;

export default ChatMessageList;
