import { LibraryAdd } from "@mui/icons-material";
import { Button } from "@/components/actions";
import { routes, messages } from "@/utils/constants";
import { NewChatButtonStyles } from "./NewChatButton.styles";

/** Renders the new chat button option for the chat list. */
const NewChatButton = () => {
    return (
        <Button
            sx={NewChatButtonStyles}
            variant="text"
            startIcon={<LibraryAdd />}
            isLink
            href={`/${routes.chats.CHATS}`}
        >
            {messages.chats.create.LABEL}
        </Button>
    );
};

export default NewChatButton;
