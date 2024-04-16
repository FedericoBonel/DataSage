import propTypes from "prop-types";

/** Proptypes of chat as it is showed in a list */
export default {
    /** Id of the chat */
    _id: propTypes.string.isRequired,
    /** Name of the chat */
    name: propTypes.string.isRequired,
    /** Date and hour of creation of the chat as an ISO string */
    createdAt: propTypes.string.isRequired,
    /** Owner of the chat */
    owner: propTypes.shape({
        /** Id of the owner */
        _id: propTypes.string.isRequired,
        /** Names of the owner */
        names: propTypes.string.isRequired,
        /** Lastnames of the owner */
        lastnames: propTypes.string.isRequired,
    }).isRequired,
};
