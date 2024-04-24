import { useState } from "react";
import { Card, CardHeader, CardActions, CardContent } from "@mui/material";
import { Form } from "@/components/forms";
import { TextField } from "@/components/fields";
import propTypes from "./DeleteChatForm.props";

const confirmationValue = "delete forever";

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
            buttonsLabels={{ submit: "delete forever" }}
            buttonsColor={{ submit: "error" }}
            canSubmit={canSubmit}
            onSubmit={onSubmit}
        >
            <CardHeader
                title={"Danger Zone - Delete Chat"}
                titleTypographyProps={{ color: "error" }}
                subheader={
                    "Deleting your chat will delete permanently all its uploaded files and data and will make it unaccessible by all participants. This action is not reversible."
                }
            />
            <CardContent>
                <TextField
                    autoComplete="off"
                    label="Confirm deletion"
                    helperText={`Insert "${confirmationValue}" to confirm deletion.`}
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
