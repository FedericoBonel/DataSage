import propTypes from "prop-types";
import ParticipantDTO from "@/dtos/participants/ParticipantDTO";

export default {
    /** Id of the chat from which to update the participant */
    chatId: propTypes.string.isRequired,
    /** The participant to be updated as it is stored in database right now */
    participant: propTypes.shape(ParticipantDTO),
    /** Function to be executed when canceling the update */
    onCancel: propTypes.func.isRequired,
};
