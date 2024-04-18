import { Unstable_Grid2 as Grid } from "@mui/material";
import { NewChatForm } from "@/features/chats";
import { NewChatFormContainerStyles } from "./NewChat.styles";

/** Component that renders the new chat page. */
const NewChat = () => {
    return (
        <Grid container>
            <Grid sx={NewChatFormContainerStyles} sm={12}>
                <NewChatForm />
            </Grid>
        </Grid>
    );
};

export default NewChat;
