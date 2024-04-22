import { DialogContentText } from "@mui/material";
import { chatsServices } from "@/services/chats";
import { DecisionDialog } from "@/components/actions";
import { ToastMessage } from "@/components/informational";
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
            deleteDocQuery.reset();
        }
    }, [deleteDocQuery, documentId, onClose]);

    return (
        <>
            <DecisionDialog
                isOpen={isOpen}
                title={messages.documents.delete.form.TITLE}
                onClose={onClose}
                onAccept={onSubmit}
                isAccepting={deleteDocQuery.isPending}
                buttonLabels={{
                    cancel: messages.actions.decision.CANCEL,
                    accept: messages.actions.decision.DELETE,
                }}
            >
                <DialogContentText>
                    {messages.documents.delete.form.QUESTION}
                </DialogContentText>
            </DecisionDialog>
            <ToastMessage
                isImportant
                autoClose
                open={
                    deleteDocQuery.isError &&
                    deleteDocQuery.error?.response?.status === 400
                }
                error={deleteDocQuery.error?.response?.data}
                onClose={deleteDocQuery.reset}
                severity="error"
            />
        </>
    );
};

DeleteDocumentDialog.propTypes = propTypes;

export default DeleteDocumentDialog;
