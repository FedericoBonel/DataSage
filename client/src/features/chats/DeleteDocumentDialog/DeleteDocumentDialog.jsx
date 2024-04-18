import { DialogContentText } from "@mui/material";
import { DecisionDialog } from "@/components/actions";
import { messages } from "@/utils/constants";
import propTypes from "./DeleteDocumentDialog.props";

/** Dialog that prompts the user to delete a document from a chat or not. */
const DeleteDocumentDialog = ({ chatId, documentId, isOpen, onClose }) => {
    const deleteDocQuery = {
        isPending: false,
        isSuccess: false,
        mutate: () => console.log(documentId),
    };

    const onSubmit = () => {
        deleteDocQuery.mutate({ chatId, documentId }, { onSuccess: onClose });
        onClose();
    };

    return (
        <DecisionDialog
            isOpen={isOpen}
            title={messages.documents.delete.form.TITLE}
            onClose={onClose}
            onAccept={onSubmit}
            isAccepting={deleteDocQuery.isPending}
            buttonLabels={{
                cancel: messages.actions.decision.CANCEL,
                accept: messages.actions.decision.DELETE,
            }}
        >
            <DialogContentText>
                {messages.documents.delete.form.QUESTION}
            </DialogContentText>
        </DecisionDialog>
    );
};

DeleteDocumentDialog.propTypes = propTypes;

export default DeleteDocumentDialog;
