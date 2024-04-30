import { useEffect } from "react";
import { DialogContentText } from "@mui/material";
import { chatsServices } from "@/services/chats";
import DecisionDialog from "@/components/actions/DecisionDialog";
import ToastMessage from "@/components/informational/ToastMessage";
import { messages } from "@/utils/constants";
import propTypes from "./DeleteParticipantDialog.props";

/** Dialog that prompts the user to delete a participant from a chat. */
const DeleteParticipantDialog = ({
    chatId,
    participantId,
    isOpen,
    onClose,
}) => {
    const deleteQuery = chatsServices.useDeleteParticipantFromChatById();

    const onSubmit = () => {
        deleteQuery.mutate({ chatId, participantId });
        onClose();
    };

    useEffect(() => {
        if (deleteQuery.isSuccess) {
            if (deleteQuery.data.data?._id === participantId) onClose();
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
            <ToastMessage
                autoClose
                open={deleteQuery.isSuccess}
                message={messages.chats.participants.delete.form.SUCCESS}
                onClose={deleteQuery.reset}
                severity="success"
            />
        </>
    );
};

DeleteParticipantDialog.propTypes = propTypes;

export default DeleteParticipantDialog;
