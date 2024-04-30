import { useState } from "react";
import { Card, CardHeader, CardContent, CardActions } from "@mui/material";
import { chatsServices } from "@/services/chats";
import { Form, FormAlert } from "@/components/forms";
import { api, messages } from "@/utils/constants";
import { participantsValidator } from "@/utils/validators";
import PermissionsParticipantsForm from "../components/PermissionsParticipantsForm";
import ParticipantContactForm from "../components/ParticipantContactForm";
import propTypes from "./NewParticipantsForm.props";

const readDocs = api.validation.participants.allowedActions.READ_DOCS;
const uploadDocs = api.validation.participants.allowedActions.UPLOAD_DOCS;

const initialState = {
    email: "",
    permissions: {
        [readDocs]: false,
        [uploadDocs]: false,
    },
};

const formatData = (formState) => ({
    email: formState.email,
    permissions: Object.keys(formState.permissions).filter(
        (action) => formState.permissions[action]
    ),
});

/** Renders a new participant form to add participants to a chat by id */
const NewParticipantForm = ({ chatId }) => {
    const [participant, setParticipant] = useState(initialState);
    const inviteQuery = chatsServices.useInviteParticipant();

    const resetForm = () => {
        inviteQuery.reset();
        setParticipant(initialState);
    };

    const onChangeEmail = (e) =>
        setParticipant((prev) => ({ ...prev, email: e.target.value }));

    const onToggle = (event) =>
        setParticipant((prev) => ({
            ...prev,
            permissions: {
                ...prev.permissions,
                [event.target.name]: event.target.checked,
            },
        }));


    const onSubmit = (e) => {
        e.preventDefault();

        const newParticipant = formatData(participant);

        inviteQuery.mutate(
            { chatId, newParticipant },
            { onSuccess: resetForm }
        );
    };

    const formError = inviteQuery.isError && (
        <FormAlert error={inviteQuery.error?.response?.data} />
    );

    return (
        <Form
            component={Card}
            buttonsWrapper={CardActions}
            buttonsLabels={{ submit: "invite", cancel: "reset" }}
            onSubmit={onSubmit}
            isSubmitting={inviteQuery.isPending}
            onCancel={resetForm}
            canSubmit={participantsValidator.newParticipant(participant)}
        >
            <CardHeader
                title={messages.chats.participants.create.TITLE}
                subheader={messages.chats.participants.create.SUB_TITLE}
            />
            <CardContent>
                <ParticipantContactForm
                    emailField={{
                        value: participant.email,
                        onChange: onChangeEmail,
                    }}
                />
                <PermissionsParticipantsForm
                    assignedPermissions={participant.permissions}
                    onChangePermission={onToggle}
                />
            </CardContent>
            {formError}
        </Form>
    );
};

NewParticipantForm.propTypes = propTypes;

export default NewParticipantForm;
