import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent, CardActions } from "@mui/material";
import { chatsServices } from "@/services/chats";
import { FormAlert } from "@/components/forms";
import Form from "@/components/forms/Form";
import { messages, routes } from "@/utils/constants";
import { chatsValidator } from "@/utils/validators";
import { DocumentsChatForm } from "../components/DocumentsChatForm";
import { MetadataChatForm } from "../components/MetadataChatForm";

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

    const resetForm = () => {
        createQuery.reset();
        setNewChat(initialFormState);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        createQuery.mutate(newChat, {
            onSuccess: ({ data }) =>
                navigate(`/${routes.chats.CHATS}/${data._id}`),
        });
    };

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
            <DocumentsChatForm
                documentsField={{
                    onChange: onFileSelection,
                    documents: newChat.documents,
                }}
                isSubmitting={createQuery.isPending}
            />
            <CardContent>
                <MetadataChatForm
                    nameField={{
                        onChange: onChangeTextField,
                        value: newChat.name,
                    }}
                    isSubmitting={createQuery.isPending}
                />
            </CardContent>
            {errors}
        </Form>
    );
};

export default NewChatForm;
