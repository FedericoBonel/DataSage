import { Card, CardHeader, CardContent } from "@mui/material";
import { messages } from "@/utils/constants";
import propTypes from "./ChatFileSection.props";

/** Renders the chat file management section of the chat settings page. */
const ChatFileSection = ({ children }) => {
    return (
        <Card>
            <CardHeader
                title={messages.chats.settings.files.TITLE}
                subheader={messages.chats.settings.files.SUBTITLE}
            />
            <CardContent>{children}</CardContent>
        </Card>
    );
};

ChatFileSection.propTypes = propTypes;

export default ChatFileSection;
