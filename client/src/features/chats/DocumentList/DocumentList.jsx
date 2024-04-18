import { List, Typography } from "@mui/material";
import { chatsServices } from "@/services/chats";
import DeleteDocumentDialog from "../DeleteDocumentDialog/DeleteDocumentDialog";
import { ShowLoader } from "@/components/informational";
import useDialog from "@/utils/hooks/useDialog";
import { messages } from "@/utils/constants";
import DocumentListItem from "./components/DocumentListItem/DocumentListItem";
import { ListStyles } from "./DocumentList.styles";
import propTypes from "./DocumentList.props";

/** Renders the list of documents by chat id. */
const DocumentList = ({ chatId }) => {
    const { selected, open, isOpen, close } = useDialog();

    const docsQuery = chatsServices.useChatDocsData(chatId);

    const items = docsQuery.data?.data.map((documentItem) => (
        <DocumentListItem
            key={documentItem._id}
            documentItem={documentItem}
            onClickDelete={open}
        />
    ));

    const numberFilesUploaded = docsQuery.isSuccess && (
        <Typography variant="overline">
            {messages.documents.list.createFilesUploadedMessage(
                docsQuery.data.data?.length
            )}
        </Typography>
    );

    return (
        <ShowLoader isLoading={docsQuery.isLoading}>
            {numberFilesUploaded}
            <List sx={ListStyles}>{items}</List>
            <DeleteDocumentDialog
                chatId={chatId}
                documentId={selected}
                isOpen={isOpen}
                onClose={close}
            />
        </ShowLoader>
    );
};

DocumentList.propTypes = propTypes;

export default DocumentList;
