import { useState } from "react";
import { Typography } from "@mui/material";
import { chatsServices } from "@/services/chats";
import { Form, FormAlert } from "@/components/forms";
import { ShowLoader } from "@/components/informational";
import { messages } from "@/utils/constants";
import { chatsValidator } from "@/utils/validators";
import { DocumentsChatForm } from "../components/DocumentsChatForm";
import propTypes from "./AddDocumentsForm.props";

const initialFormState = { documents: [] };

/** Renders a document upload form to add documents to a chat by id. */
const AddDocumentsForm = ({ chatId }) => {
    const [docsToUpload, setDocsToUpload] = useState(initialFormState);

    const docsListQuery = chatsServices.useChatDocsData(chatId);
    const canUploadMore =
        docsListQuery.isSuccess &&
        chatsValidator.isUnderDocsLimit(docsListQuery.data?.data);

    const addDocQuery = chatsServices.useAddDocToChatById();

    const resetForm = () => {
        setDocsToUpload(initialFormState);
        addDocQuery.reset();
    };

    // Updates state when files are selected
    const onFileSelection = (documents) => {
        setDocsToUpload((prev) => ({ ...prev, documents }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        addDocQuery.mutate(
            { chatId, documents: docsToUpload },
            { onSuccess: resetForm }
        );
    };

    // If submition was unsuccessful show the corresponding errors
    const errors = addDocQuery.isError && (
        <FormAlert error={addDocQuery.error?.response?.data} />
    );

    // If the user cant upload more documents explain why.
    const fileLimitMessage = !canUploadMore && (
        <Typography variant="caption">
            {messages.documents.upload.MAX_REACHED}
        </Typography>
    );

    return (
        <ShowLoader isLoading={docsListQuery.isLoading}>
            <Form
                onSubmit={onSubmit}
                canSubmit={
                    canUploadMore && chatsValidator.uploadDocs(docsToUpload)
                }
                onCancel={resetForm}
                isSubmitting={addDocQuery.isPending}
                buttonsLabels={{
                    submit: messages.documents.upload.form.buttons.ACCEPT,
                    cancel: messages.documents.upload.form.buttons.CANCEL,
                }}
            >
                <DocumentsChatForm
                    documentsField={{
                        onChange: onFileSelection,
                        documents: docsToUpload.documents,
                        disabled: !canUploadMore || addDocQuery.isPending,
                    }}
                />
                {fileLimitMessage}
                {errors}
            </Form>
        </ShowLoader>
    );
};

AddDocumentsForm.propTypes = propTypes;

export default AddDocumentsForm;
