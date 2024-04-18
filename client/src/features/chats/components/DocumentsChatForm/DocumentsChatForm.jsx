import { Typography, ListItem, ListItemText } from "@mui/material";
import { Upload } from "@mui/icons-material";
import { FileField } from "@/components/fields";
import { api, messages } from "@/utils/constants";
import propTypes from "./DocumentsChatForm.props";

/**
 * Component that renders the documents selection (file selection) section in chat forms.
 * It asks for the chat documents that will be the chat knowledge base.
 */
const DocumentsChatForm = ({ documentsField }) => {
    // Feedback of file selection
    const fileList = Boolean(documentsField.documents.length) && (
        <ListItem>
            <ListItemText
                secondary={
                    documentsField.documents.length < 2
                        ? documentsField.documents[0].name
                        : messages.chats.formSections.documents.createFilesSelectedFeedback(
                            documentsField.documents.length
                          )
                }
            />
        </ListItem>
    );

    return (
        <>
            <FileField
                sx={{ height: 200 }}
                acceptedTypes={api.validation.chats.ACCEPTED_FORMATS}
                maxFiles={api.validation.chats.MAX_FILES_UPLOAD}
                maxSize={api.validation.chats.MAX_FILE_SIZE}
                onChange={documentsField.onChange}
            >
                <Upload fontSize="large" />
                <Typography variant="subtitle2">
                    {messages.chats.formSections.documents.FILE_FIELD}
                </Typography>
            </FileField>
            {fileList}
        </>
    );
};

DocumentsChatForm.propTypes = propTypes;

export default DocumentsChatForm;
