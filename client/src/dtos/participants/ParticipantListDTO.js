import propTypes from "prop-types";

/** Proptypes of chat participant as it is showed in a list */
export default {
    /** Id of the chat participant */
    _id: propTypes.string.isRequired,
    /** Names of the chat participant */
    names: propTypes.string.isRequired,
    /** Lastnames of the chat participant */
    lastnames: propTypes.string.isRequired,
    /** Email of the chat participant */
    email: propTypes.string.isRequired,
    /** True if the participant has joined the chat (accepted the invitation), false otherwise */
    hasJoined: propTypes.bool.isRequired,
    /** Date and hour of creation of the chat participant as an ISO string */
    createdAt: propTypes.string.isRequired,
};
