import propTypes from "prop-types";

/** Proptypes of a chat document as it is showed in a list */
export default {
    /** Id of the document */
    _id: propTypes.string.isRequired,
    /** Name of the document (filename) */
    name: propTypes.string.isRequired,
    /** Url of the document */
    url: propTypes.string.isRequired,
    /** Date and hour of registration and upload of the document as an ISO string */
    createdAt: propTypes.string.isRequired,
};
