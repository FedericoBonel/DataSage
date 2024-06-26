import { List, Typography } from "@mui/material";
import documentsServices from "@/services/documents";
import DeleteDocumentDialog from "../DeleteDocumentDialog";
import ShowLoader from "@/components/informational/ShowLoader";
import useDialog from "@/utils/hooks/useDialog";
import { messages } from "@/utils/constants";
import DocumentListItem from "./components/DocumentListItem/DocumentListItem";
import { ListStyles } from "./DocumentList.styles";
import propTypes from "./DocumentList.props";

/** Renders the list of documents by chat id and handles their delete dialog. */
const DocumentList = ({ chatId, showDelete }) => {
    const { selected, open, isOpen, close } = useDialog();

    const docsQuery = documentsServices.useChatDocsData(chatId);

    const items = docsQuery.data?.data.map((documentItem) => (
        <DocumentListItem
            key={documentItem._id}
            documentItem={documentItem}
            onClickDelete={open}
            showDelete={showDelete}
        />
    ));

    const numberFilesUploaded = docsQuery.isSuccess && (
        <Typography variant="overline">
            {messages.chats.documents.list.createFilesUploadedMessage(
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
