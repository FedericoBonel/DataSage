import { useState } from "react";
import { Typography, ListItem, ListItemText } from "@mui/material";
import { Upload } from "@mui/icons-material";
import { FileField } from "@/components/fields";
import { ToastMessage } from "@/components/informational";
import { api, messages } from "@/utils/constants";
import propTypes from "./DocumentsChatForm.props";

/**
 * Component that renders the documents selection (file selection) section in chat forms.
 * It asks for the chat documents that will be the chat knowledge base.
 */
const DocumentsChatForm = ({ documentsField }) => {
    const [showInvalidFiles, setShowInvalidFiles] = useState(false);

    // Feedback of file selection
    const fileList = Boolean(documentsField.documents.length) && (
        <ListItem>
            <ListItemText
                secondary={
                    documentsField.documents.length < 2
                        ? documentsField.documents[0].name
                        : messages.chats.documents.createFilesSelectedFeedback(
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
                disabled={documentsField.disabled}
                onSelectedInvalid={() => setShowInvalidFiles(true)}
            >
                <Upload fontSize="large" />
                <Typography variant="subtitle2">
                    {messages.chats.documents.FILE_FIELD}
                </Typography>
            </FileField>
            {fileList}
            <ToastMessage
                autoClose
                open={showInvalidFiles}
                onClose={() => setShowInvalidFiles(false)}
                severity="alert"
                message={messages.chats.documents.FILE_FIELD_INVALID_ALERT}
            />
        </>
    );
};

DocumentsChatForm.propTypes = propTypes;

export default DocumentsChatForm;
