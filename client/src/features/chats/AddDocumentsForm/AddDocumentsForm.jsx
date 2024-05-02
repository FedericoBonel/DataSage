import { useState } from "react";
import { Typography } from "@mui/material";
import documentsServices from "@/services/documents";
import Form from "@/components/forms/Form";
import FormAlert from "@/components/forms/FormAlert";
import ShowLoader from "@/components/informational/ShowLoader";
import { messages } from "@/utils/constants";
import { chatsValidator } from "@/utils/validators";
import { DocumentsChatForm } from "../components/DocumentsChatForm";
import propTypes from "./AddDocumentsForm.props";

const initialFormState = { documents: [] };

/** Renders a document upload form to add documents to a chat by id. */
const AddDocumentsForm = ({ chatId, showCount }) => {
    const [docsToUpload, setDocsToUpload] = useState(initialFormState);

    const docsListQuery = documentsServices.useChatDocsData(chatId, {
        enabled: showCount,
    });
    const canUploadMore =
        !showCount ||
        (docsListQuery.isSuccess &&
            chatsValidator.isUnderDocsLimit(docsListQuery.data?.data));

    const addDocQuery = documentsServices.useAddDocToChatById();

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
            {messages.chats.documents.upload.MAX_REACHED}
        </Typography>
    );

    return (
        <ShowLoader isLoading={showCount && docsListQuery.isLoading}>
            <Form
                onSubmit={onSubmit}
                canSubmit={
                    canUploadMore && chatsValidator.uploadDocs(docsToUpload)
                }
                onCancel={resetForm}
                isSubmitting={addDocQuery.isPending}
                buttonsLabels={{
                    submit: messages.chats.documents.upload.form.buttons.ACCEPT,
                    cancel: messages.chats.documents.upload.form.buttons.CANCEL,
                }}
            >
                <DocumentsChatForm
                    documentsField={{
                        onChange: onFileSelection,
                        documents: docsToUpload.documents,
                        disabled: !canUploadMore,
                    }}
                    isSubmitting={addDocQuery.isPending}
                />
                {fileLimitMessage}
                {errors}
            </Form>
        </ShowLoader>
    );
};

AddDocumentsForm.propTypes = propTypes;

export default AddDocumentsForm;
