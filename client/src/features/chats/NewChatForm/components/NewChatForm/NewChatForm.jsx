import { useState } from "react";
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Typography,
    ListItem,
    ListItemText,
} from "@mui/material";
import { Upload } from "@mui/icons-material";
import { Form } from "@/components/forms";
import { TextField, FileField } from "@/components/fields";
import { messages, api } from "@/utils/constants";
import { chatsValidator } from "@/utils/validators";

/** Initial state of the form */
const initialFormState = {
    name: "",
    files: [],
};

/** Renders a new chat form for creating chats */
const NewChatForm = () => {
    const [newChat, setNewChat] = useState(initialFormState);

    // Updates state when text fields changes
    const onChangeTextField = (e) =>
        setNewChat((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

    // Updates state when files are selected
    const onFileSelection = (files) => {
        setNewChat((prev) => ({ ...prev, files }));
    };

    const resetForm = () => setNewChat(initialFormState);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted!");
    };

    // Feedback of file selection
    const fileList = Boolean(newChat.files.length) && (
        <ListItem>
            <ListItemText
                secondary={
                    newChat.files.length < 2
                        ? newChat.files[0].name
                        : messages.chats.create.form.createFilesSelectedFeedback(
                              newChat.files.length
                          )
                }
            />
        </ListItem>
    );

    return (
        <Form
            component={Card}
            buttonsWrapper={CardActions}
            sx={{ flex: 1, maxWidth: 700 }}
            onSubmit={onSubmit}
            canSubmit={chatsValidator.newChat(newChat)}
            onCancel={resetForm}
        >
            <CardHeader
                title={messages.chats.create.form.TITLE}
                subheader={messages.chats.create.form.SUB_TITLE}
            />
            {/* PDF selection field */}
            <FileField
                sx={{ height: 200 }}
                acceptedTypes={api.validation.chats.ACCEPTED_FORMATS}
                maxFiles={api.validation.chats.MAX_FILES_UPLOAD}
                maxSize={api.validation.chats.MAX_FILE_SIZE}
                onChange={onFileSelection}
            >
                <Upload fontSize="large" />
                <Typography variant="subtitle2">
                    {messages.chats.create.form.FILE_FIELD}
                </Typography>
            </FileField>
            {fileList}
            <CardContent>
                {/* Chat name field */}
                <TextField
                    value={newChat.name}
                    variant="standard"
                    label={messages.chats.create.form.NAME_FIELD}
                    inputProps={{
                        required: true,
                        maxLength: api.validation.chats.MAX_NAME_LENGTH,
                    }}
                    fullWidth
                    name="name"
                    onChange={onChangeTextField}
                />
            </CardContent>
        </Form>
    );
};

export default NewChatForm;
