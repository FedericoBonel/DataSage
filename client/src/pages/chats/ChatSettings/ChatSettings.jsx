import { useMatch } from "react-router-dom";
import { Unstable_Grid2 as Grid, Typography } from "@mui/material";
import UpdateChatForm from "@/features/chats/UpdateChatForm";
import AddDocumentsForm from "@/features/chats/AddDocumentsForm";
import DocumentList from "@/features/chats/DocumentList";
import DeleteChatForm from "@/features/chats/DeleteChatForm";
import ExitChatForm from "@/features/chats/ExitChatForm";
import useAccess from "@/pages/chats/layouts/AuthorizeToChat/useAccess";
import { api, messages, routes } from "@/utils/constants";
import { UpdateChatFormContainerStyles } from "./ChatSettings.styles";
import ChatFileSection from "./components/ChatFilesSection/ChatFileSection";

const UPLOAD_DOCS_PERM = [api.validation.participants.allowedActions.UPLOAD_DOCS];
const READ_DOCS_PERM = [api.validation.participants.allowedActions.READ_DOCS];

/** Component that renders the settings page for a chat. */
const ChatSettings = () => {
    // Get the chat id from url
    const match = useMatch(`/${routes.chats.CHATS}/:selectedChat/*`);
    const chatId = match?.params?.selectedChat;
    const access = useAccess();

    const showUploadDocs = access.verifyPermissions(UPLOAD_DOCS_PERM);
    const showDocsList = access.verifyPermissions(READ_DOCS_PERM);

    const fileManagement = (showDocsList || showUploadDocs) && (
        <Grid sm={12}>
            <ChatFileSection>
                {showUploadDocs && (
                    <AddDocumentsForm
                        chatId={chatId}
                        showCount={showDocsList}
                    />
                )}
                {showDocsList && (
                    <DocumentList chatId={chatId} showDelete={access.isOwner} />
                )}
            </ChatFileSection>
        </Grid>
    );

    return (
        <Grid sx={UpdateChatFormContainerStyles} container rowSpacing={4}>
            <Grid sm={12}>
                <Typography component="h1" variant="h3">
                    {messages.chats.settings.PAGE_TITLE}
                </Typography>
            </Grid>
            {/* Update chat information section. */}
            {access.isOwner && (
                <Grid sm={12}>
                    <UpdateChatForm chatId={chatId} />
                </Grid>
            )}
            {/* File management section. */}
            {fileManagement}
            {/* Delete chat. */}
            {access.isOwner && (
                <Grid sm={12}>
                    <DeleteChatForm chatId={chatId} />
                </Grid>
            )}
            {/* Exit chat. */}
            {!access.isOwner && (
                <Grid sm={12}>
                    <ExitChatForm chatId={chatId} />
                </Grid>
            )}
        </Grid>
    );
};

export default ChatSettings;
