import { useEffect } from "react";
import { DialogContentText } from "@mui/material";
import { chatsServices } from "@/services/chats";
import { DecisionDialog } from "@/components/actions";
import { ToastMessage } from "@/components/informational";
import { messages } from "@/utils/constants";
import propTypes from "./DeleteParticipantDialog.props";

/** Dialog that prompts the user to delete a participant from a chat. */
const DeleteDocumentDialog = ({ chatId, participantId, isOpen, onClose }) => {
    const deleteQuery = chatsServices.useDeleteParticipantFromChatById();

    const onSubmit = () => {
        deleteQuery.mutate({ chatId, participantId });
        onClose();
    };

    useEffect(() => {
        if (deleteQuery.isSuccess) {
            if (deleteQuery.data.data?._id === participantId) onClose();
            deleteQuery.reset();
        }
    }, [deleteQuery, participantId, onClose]);

    return (
        <>
            <DecisionDialog
                isOpen={isOpen}
                title={messages.chats.participants.delete.form.TITLE}
                onClose={onClose}
                onAccept={onSubmit}
                isAccepting={deleteQuery.isPending}
                buttonLabels={{
                    cancel: messages.actions.decision.CANCEL,
                    accept: messages.actions.decision.REMOVE,
                }}
            >
                <DialogContentText>
                    {messages.chats.participants.delete.form.QUESTION}
                </DialogContentText>
            </DecisionDialog>
            <ToastMessage
                isImportant
                autoClose
                open={deleteQuery.isError}
                error={deleteQuery.error?.response?.data}
                onClose={deleteQuery.reset}
                severity="error"
            />
        </>
    );
};

DeleteDocumentDialog.propTypes = propTypes;

export default DeleteDocumentDialog;
