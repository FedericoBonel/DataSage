import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { chatsServices } from "@/services/chats";
import { Form, FormAlert } from "@/components/forms";
import { TextField, FileField } from "@/components/fields";
import { messages, api, routes } from "@/utils/constants";
import { chatsValidator } from "@/utils/validators";

/** Initial state of the form */
const initialFormState = {
    name: "",
    documents: [],
};

/** Renders a new chat form for creating chats */
const NewChatForm = () => {
    const navigate = useNavigate();
    const [newChat, setNewChat] = useState(initialFormState);

    const createQuery = chatsServices.useCreateChat();

    // Updates state when text fields changes
    const onChangeTextField = (e) =>
        setNewChat((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

    // Updates state when files are selected
    const onFileSelection = (documents) => {
        setNewChat((prev) => ({ ...prev, documents }));
    };

    const resetForm = () => setNewChat(initialFormState);

    const onSubmit = (e) => {
        e.preventDefault();

        createQuery.mutate(newChat, {
            onSuccess: ({ data }) =>
                navigate(`/${routes.chats.CHATS}/${data._id}`),
        });
    };

    // Feedback of file selection
    const fileList = Boolean(newChat.documents.length) && (
        <ListItem>
            <ListItemText
                secondary={
                    newChat.documents.length < 2
                        ? newChat.documents[0].name
                        : messages.chats.create.form.createFilesSelectedFeedback(
                              newChat.documents.length
                          )
                }
            />
        </ListItem>
    );

    // If submition was unsuccessful show the corresponding errors
    const errors = createQuery.isError && (
        <FormAlert error={createQuery.error?.response?.data} />
    );

    return (
        <Form
            component={Card}
            buttonsWrapper={CardActions}
            sx={{ flex: 1, maxWidth: 700 }}
            onSubmit={onSubmit}
            canSubmit={chatsValidator.newChat(newChat)}
            onCancel={resetForm}
            isSubmitting={createQuery.isPending}
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
            {errors}
        </Form>
    );
};

export default NewChatForm;
