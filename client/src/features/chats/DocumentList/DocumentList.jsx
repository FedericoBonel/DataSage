import { List, Typography } from "@mui/material";
import { chatsServices } from "@/services/chats";
import { ShowLoader } from "@/components/informational";
import { messages } from "@/utils/constants";
import DocumentListItem from "./components/DocumentListItem/DocumentListItem";
import { ListStyles } from "./DocumentList.styles";
import propTypes from "./DocumentList.props";

/** Renders the list of documents by chat id. */
const DocumentList = ({ chatId }) => {
    const docsQuery = chatsServices.useChatDocsData(chatId);

    const items = docsQuery.data?.data.map((documentItem) => (
        <DocumentListItem key={documentItem._id} documentItem={documentItem} />
    ));

    return (
        <ShowLoader isLoading={docsQuery.isLoading}>
            <List sx={ListStyles}>
                <Typography variant="overline">
                    {messages.documents.list.createFilesUploadedMessage(
                        docsQuery.data.data?.length
                    )}
                </Typography>
                {items}
            </List>
        </ShowLoader>
    );
};

DocumentList.propTypes = propTypes;

export default DocumentList;
