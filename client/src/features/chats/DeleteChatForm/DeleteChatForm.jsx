import { useState } from "react";
import { Card, CardHeader, CardActions, CardContent } from "@mui/material";
import { Form } from "@/components/forms";
import { TextField } from "@/components/fields";
import { messages } from "@/utils/constants";
import propTypes from "./DeleteChatForm.props";

const confirmationValue = messages.actions.deleteForever.confirmation.VALUE;

/** Renders a delete form to delete chats by id. */
const DeleteChatForm = ({ chatId }) => {
    const [confirmation, setConfirmation] = useState("");

    const canSubmit = confirmation === confirmationValue;

    const onSubmit = (e) => {
        e.preventDefault();

        alert(chatId);
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
