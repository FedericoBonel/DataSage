import { useEffect } from "react";
import { DialogContentText } from "@mui/material";
import notificationsServices from "@/services/notifications";
import DecisionDialog from "@/components/actions/DecisionDialog";
import ToastMessage from "@/components/informational/ToastMessage";
import { api, messages } from "@/utils/constants";
import propTypes from "./DeleteNotificationDialog.props";

const TITLES = {
    [api.validation.notifications.types.CHAT_INVITATION]:
        messages.notifications.delete.chatInvitation.TITLE,
};

const QUESTIONS = {
    [api.validation.notifications.types.CHAT_INVITATION]:
        messages.notifications.delete.chatInvitation.QUESTION,
};

/** Renders the delete notification dialog for a specific notification with a specific type. */
const DeleteNotificationDialog = ({
    notificationId,
    notificationType,
    isOpen,
    onClose,
}) => {
    const deleteQuery = notificationsServices.useDeleteNotificationById();

    const onSubmit = () => {
        deleteQuery.mutate({ notificationId });
        onClose();
    };

    useEffect(() => {
        if (deleteQuery.isSuccess) {
            if (deleteQuery.data.data?._id === notificationId) onClose();
        }
    }, [deleteQuery, notificationId, onClose]);

    return (
        <>
            <DecisionDialog
                isOpen={isOpen}
                title={TITLES[notificationType]}
                onClose={onClose}
                onAccept={onSubmit}
                isAccepting={deleteQuery.isPending}
                buttonLabels={{
                    cancel: messages.actions.decision.CANCEL,
                    accept: messages.actions.decision.DELETE,
                }}
            >
                <DialogContentText>
                    {QUESTIONS[notificationType]}
                </DialogContentText>
            </DecisionDialog>
            <ToastMessage
                autoClose
                open={deleteQuery.isSuccess}
                message={messages.notifications.delete.SUCCESS}
                onClose={deleteQuery.reset}
                severity="success"
            />
        </>
    );
};

DeleteNotificationDialog.propTypes = propTypes;

export default DeleteNotificationDialog;
