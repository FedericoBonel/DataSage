import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card, CardHeader, CardActions, CardContent } from "@mui/material";
import accountsServices from "@/services/accounts";
import Form from "@/components/forms/Form";
import TextField from "@/components/fields/TextField";
import { messages, routes } from "@/utils/constants";

const confirmationValue = messages.actions.deleteForever.confirmation.VALUE;

/** Component that renders the user account deletion form that allows users to completly delete their account and all its information. */
const DeleteAccountForm = () => {
    const navigate = useNavigate();
    const [confirmation, setConfirmation] = useState("");

    const deleteAccountQuery = accountsServices.useDeleteAccount();

    const canSubmit = confirmation === confirmationValue;

    const onSubmit = (e) => {
        e.preventDefault();

        deleteAccountQuery.mutate(undefined, {
            onSuccess: () =>
                navigate(`/${routes.auth.AUTH}/${routes.auth.LOGIN}`),
        });
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
            isSubmitting={deleteAccountQuery.isPending}
        >
            <CardHeader
                title={messages.account.delete.form.TITLE}
                titleTypographyProps={{ color: "error" }}
                subheader={messages.account.delete.form.SUB_TITLE}
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

export default DeleteAccountForm;
