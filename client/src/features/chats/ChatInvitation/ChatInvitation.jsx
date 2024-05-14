import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import chatsServices from "@/services/chats";
import participationsServices from "@/services/participations";
import Form from "@/components/forms/Form";
import ShowLoader from "@/components/informational/ShowLoader";
import BotImage from "@/assets/chatbot.png";
import { routes, messages } from "@/utils/constants";
import { FormStyles, FormImageStyles } from "./ChatInvitation.styles";
import propTypes from "./ChatInvitation.props";

/** Renders the join chat form to joina chat by id */
const ChatInvitation = ({ chatId }) => {
    const chatQuery = chatsServices.useChatById(chatId);
    const joinQuery = participationsServices.useJoinChatById();
    const navigate = useNavigate();

    useEffect(() => {
        if (chatQuery.isSuccess) {
            if (chatQuery.data?.data.hasJoined)
                navigate(`/${routes.chats.CHATS}/${chatId}`);
        }
    }, [chatQuery, chatId, navigate]);

    const onSubmit = (e) => {
        e.preventDefault();

        joinQuery.mutate(
            { chatId },
            { onSuccess: () => navigate(`/${routes.chats.CHATS}/${chatId}`) }
        );
    };

    return (
        <ShowLoader
            isLoading={chatQuery.isLoading || chatQuery.data?.data.hasJoined}
        >
            {chatQuery.isSuccess && (
                <Form
                    canSubmit
                    onSubmit={onSubmit}
                    isSubmitting={joinQuery.isPending}
                    onCancel={() => navigate(-1)}
                    sx={FormStyles}
                    buttonsLabels={{
                        submit: messages.actions.decision.JOIN,
                        cancel: messages.actions.decision.CANCEL,
                    }}
                >
                    <Box
                        sx={FormImageStyles}
                        component="img"
                        loading="lazy"
                        src={BotImage}
                    />
                    <Typography variant="h6">
                        {messages.chats.join.form.TITLE}
                    </Typography>
                    <Typography variant="h4">
                        {chatQuery.data.data.name}
                    </Typography>
                    <Typography variant="body1">
                        {messages.chats.join.form.QUESTION}
                    </Typography>
                </Form>
            )}
        </ShowLoader>
    );
};

ChatInvitation.propTypes = propTypes;

export default ChatInvitation;
