import { useMatch } from "react-router-dom";
import { Unstable_Grid2 as Grid } from "@mui/material";
import ChatDocumentViewer from "@/features/chats/ChatDocumentViewer";
import ChatConversationFeature from "@/features/chats/ChatConversation";
import useAccess from "@/pages/chats/layouts/AuthorizeToChat/useAccess";
import {
    ConversationPageWrapperStyles,
    ChatConversationSectionStyles,
    DocumentViewerSectionStyles,
} from "./ChatConversation.styles";
import { routes, api } from "@/utils/constants";

const READ_DOCS_PERM = [api.validation.participants.allowedActions.READ_DOCS];

/** Component that renders the chat conversation page */
const ChatConversation = () => {
    // Get the chat id from url
    const match = useMatch(`/${routes.chats.CHATS}/:selectedChat/*`);
    const chatId = match?.params?.selectedChat;
    const access = useAccess();

    const canViewDocuments = access.verifyPermissions(READ_DOCS_PERM);

    return (
        <Grid container sx={ConversationPageWrapperStyles}>
            {/* PDF Viewer section */}
            {canViewDocuments && (
                <Grid xs={0} md={6} sx={DocumentViewerSectionStyles}>
                    <ChatDocumentViewer key={chatId} chatId={chatId} />
                </Grid>
            )}
            {/* Chat conversation section */}
            <Grid
                xs={12}
                md={canViewDocuments ? 6 : 9}
                sx={ChatConversationSectionStyles}
            >
                <ChatConversationFeature chatId={chatId} key={chatId} />
            </Grid>
        </Grid>
    );
};

export default ChatConversation;
