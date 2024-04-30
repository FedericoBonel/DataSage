import { useState } from "react";
import { DialogTitle, DialogContent, DialogActions } from "@mui/material";
import chatsServices from "@/services/chats";
import Button from "@/components/actions/Button";
import ToastMessage from "@/components/informational/ToastMessage";
import { api, messages } from "@/utils/constants";
import PermissionsParticipantsForm from "../components/PermissionsParticipantsForm";
import propTypes from "./UpdateParticipantDialogBody.props";

const readDocs = api.validation.participants.allowedActions.READ_DOCS;
const uploadDocs = api.validation.participants.allowedActions.UPLOAD_DOCS;

const setInitialState = (participant) => {
    const updateForm = {
        permissions: {
            [readDocs]: false,
            [uploadDocs]: false,
        },
    };
    participant?.permissions.forEach(
        (permission) =>
            (updateForm.permissions[permission.allowedAction] = true)
    );
    return updateForm;
};

const formatData = (formState) => ({
    permissions: Object.keys(formState.permissions).filter(
        (action) => formState.permissions[action]
    ),
});

/**
 * Renders the contents of the update participant dialog form
 * (This is done this way to reset the form when the dialog is closed)
 */
const UpdateParticipantDialogBody = ({ chatId, participant, onCancel }) => {
    const [updatedParticipant, setUpdatedParticipant] = useState(() =>
        setInitialState(participant)
    );

    const updateQuery = chatsServices.useUpdateParticipantById();

    const onToggle = (event) =>
        setUpdatedParticipant((prev) => ({
            ...prev,
            permissions: {
                ...prev.permissions,
                [event.target.name]: event.target.checked,
            },
        }));

    const onSubmit = () => {
        updateQuery.mutate({
            updatedParticipant: formatData(updatedParticipant),
            chatId,
            participantId: participant._id,
        });
    };

    return (
        <>
            <DialogTitle>
                {messages.chats.participants.update.form.TITLE}
            </DialogTitle>
            <DialogContent>
                <PermissionsParticipantsForm
                    assignedPermissions={updatedParticipant.permissions}
                    onChangePermission={onToggle}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} color="error" variant="text">
                    {messages.actions.decision.CANCEL}
                </Button>
                <Button
                    onClick={onSubmit}
                    isLoading={updateQuery.isPending}
                    color="primary"
                    variant="text"
                >
                    {messages.chats.participants.update.form.SUBMIT}
                </Button>
            </DialogActions>
            <ToastMessage
                isImportant
                autoClose
                open={updateQuery.isError}
                error={updateQuery.error?.response?.data}
                onClose={updateQuery.reset}
                severity="error"
            />
            <ToastMessage
                autoClose
                open={updateQuery.isSuccess}
                message={messages.chats.participants.update.form.SUCCESS}
                onClose={updateQuery.reset}
                severity="success"
            />
        </>
    );
};

UpdateParticipantDialogBody.propTypes = propTypes;

export default UpdateParticipantDialogBody;
