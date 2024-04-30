import { Dialog } from "@mui/material";
import chatsServices from "@/services/chats";
import ShowLoader from "@/components/informational/ShowLoader";
import UpdateParticipantDialogBody from "./UpdateParticipantDialogBody";
import propTypes from "./UpdateParticipantDialog.props";

/** Dialog that prompts the user to update a participant from a chat. */
const UpdateParticipantDialog = ({
    chatId,
    participantId,
    isOpen,
    onClose,
}) => {
    const participantByIdQuery = chatsServices.useParticipantById(
        participantId,
        chatId,
        { enabled: isOpen }
    );

    return (
        <ShowLoader
            isLoading={participantByIdQuery.isLoading}
            variant="dialog"
            fallbackProps={{ open: isOpen, onClick: onClose }}
        >
            <Dialog open={isOpen} onClose={onClose}>
                <UpdateParticipantDialogBody
                    chatId={chatId}
                    participant={participantByIdQuery.data?.data}
                    onCancel={onClose}
                />
            </Dialog>
        </ShowLoader>
    );
};

UpdateParticipantDialog.propTypes = propTypes;

export default UpdateParticipantDialog;
