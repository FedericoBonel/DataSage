import propTypes from "prop-types";
import ParticipantListDTO from "@/dtos/participants/ParticipantListDTO";

export default {
    /** Participant to be shown in the list item */
    participant: propTypes.shape(ParticipantListDTO).isRequired,
    /** The function to be executed when the delete participant button is clicked */
    onClickDelete: propTypes.func.isRequired,
    /** The function to be executed when the update participant button is clicked */
    onClickEdit: propTypes.func.isRequired,
};
