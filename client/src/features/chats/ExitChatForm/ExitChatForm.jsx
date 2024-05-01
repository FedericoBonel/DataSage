import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardActions, CardHeader, CardContent } from "@mui/material";
import Form from "@/components/forms/Form";
import TextField from "@/components/fields/TextField";
import participationServices from "@/services/participations";
import { messages, routes } from "@/utils/constants";
import propTypes from "./ExitChatForm.props";

const confirmationValue = messages.chats.exit.form.confirmation.VALUE;

/** Renders an exit form to exit chats by id. */
const ExitChatForm = ({ chatId }) => {
    const navigate = useNavigate();
    const [confirmation, setConfirmation] = useState("");

    const exitQuery = participationServices.useExitChatById();

    const canSubmit = confirmation === confirmationValue;

    const onSubmit = (e) => {
        e.preventDefault();

        exitQuery.mutate(
            { chatId },
            { onSuccess: () => navigate(`/${routes.HOME}`) }
        );
    };

    return (
        <Form
            component={Card}
            buttonsWrapper={CardActions}
            buttonsLabels={{
                submit: messages.chats.exit.form.confirmation.BUTTON_LABEL,
            }}
            buttonsColor={{ submit: "error" }}
            canSubmit={canSubmit}
            onSubmit={onSubmit}
            isSubmitting={exitQuery.isPending}
        >
            <CardHeader
                title={messages.chats.exit.form.TITLE}
                titleTypographyProps={{ color: "error" }}
                subheader={messages.chats.exit.form.SUB_TITLE}
            />
            <CardContent>
                <TextField
                    autoComplete="off"
                    label={messages.chats.exit.form.confirmation.FIELD_LABEL}
                    helperText={messages.chats.exit.form.confirmation.generateHelperText(
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

ExitChatForm.propTypes = propTypes;

export default ExitChatForm;
