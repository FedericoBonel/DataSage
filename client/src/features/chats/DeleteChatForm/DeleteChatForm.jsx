import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card, CardHeader, CardActions, CardContent } from "@mui/material";
import { chatsServices } from "@/services/chats";
import Form from "@/components/forms/Form";
import TextField from "@/components/fields/TextField";
import { messages, routes } from "@/utils/constants";
import propTypes from "./DeleteChatForm.props";

const confirmationValue = messages.actions.deleteForever.confirmation.VALUE;

/** Renders a delete form to delete chats by id. */
const DeleteChatForm = ({ chatId }) => {
    const navigate = useNavigate();
    const [confirmation, setConfirmation] = useState("");

    const deleteQuery = chatsServices.useDeleteChatById();

    const canSubmit = confirmation === confirmationValue;

    const onSubmit = (e) => {
        e.preventDefault();

        deleteQuery.mutate({ chatId }, { onSuccess: navigate(`/${routes.HOME}`) });
    };

    return (
        <Form
            component={Card}
            buttonsWrapper={CardActions}
            buttonsLabels={{
                submit: messages.actions.deleteForever.confirmation
                    .BUTTON_LABEL,
            }}
            buttonsColor={{ submit: "error" }}
            canSubmit={canSubmit}
            onSubmit={onSubmit}
            isSubmitting={deleteQuery.isPending}
        >
            <CardHeader
                title={messages.chats.delete.form.TITLE}
                titleTypographyProps={{ color: "error" }}
                subheader={messages.chats.delete.form.SUB_TITLE}
            />
            <CardContent>
                <TextField
                    autoComplete="off"
                    label={
                        messages.actions.deleteForever.confirmation.FIELD_LABEL
                    }
                    helperText={messages.actions.deleteForever.confirmation.generateHelperText(
                        confirmationValue
                    )}
                    showHelperText
                    variant="standard"
                    name="confirmation"
                    value={confirmation}
                    onChange={(e) => setConfirmation(e.target.value)}
                    fullWidth
                    inputProps={{ maxLength: 64 }}
                />
            </CardContent>
        </Form>
    );
};

DeleteChatForm.propTypes = propTypes;

export default DeleteChatForm;
