import { DialogContentText } from "@mui/material";
import chatsServices from "@/services/chats";
import DecisionDialog from "@/components/actions/DecisionDialog";
import ToastMessage from "@/components/informational/ToastMessage";
import { messages } from "@/utils/constants";
import propTypes from "./DeleteDocumentDialog.props";
import { useEffect } from "react";

/** Dialog that prompts the user to delete a document from a chat or not. */
const DeleteDocumentDialog = ({ chatId, documentId, isOpen, onClose }) => {
    const deleteDocQuery = chatsServices.useDeleteDocFromChatById();

    const onSubmit = () => {
        deleteDocQuery.mutate({ chatId, documentId });
        onClose();
    };

    useEffect(() => {
        if (deleteDocQuery.isSuccess) {
            if (deleteDocQuery.data.data?._id === documentId) onClose();
        }
    }, [deleteDocQuery, documentId, onClose]);

    return (
        <>
            <DecisionDialog
                isOpen={isOpen}
                title={messages.chats.documents.delete.form.TITLE}
                onClose={onClose}
                onAccept={onSubmit}
                isAccepting={deleteDocQuery.isPending}
                buttonLabels={{
                    cancel: messages.actions.decision.CANCEL,
                    accept: messages.actions.decision.DELETE,
                }}
            >
                <DialogContentText>
                    {messages.chats.documents.delete.form.QUESTION}
                </DialogContentText>
            </DecisionDialog>
            <ToastMessage
                isImportant
                autoClose
                open={deleteDocQuery.isError}
                error={deleteDocQuery.error?.response?.data}
                onClose={deleteDocQuery.reset}
                severity="error"
            />
            <ToastMessage
                autoClose
                open={deleteDocQuery.isSuccess}
                message={messages.chats.documents.delete.form.SUCCESS}
                onClose={deleteDocQuery.reset}
                severity="success"
            />
        </>
    );
};

DeleteDocumentDialog.propTypes = propTypes;

export default DeleteDocumentDialog;
