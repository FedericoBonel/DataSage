import propTypes from "prop-types";
import { api } from "@/utils/constants";

/** Proptypes of a chat message as it is showed in a chat conversation */
export default {
    /** Id of the message */
    _id: propTypes.string.isRequired,
    /** Date and time of creation of the message */
    createdAt: propTypes.string.isRequired,
    /** Who wrote this message */
    from: propTypes.oneOf(api.validation.messages.actor).isRequired,
    /** Who receives this message */
    to: propTypes.oneOf(api.validation.messages.actor).isRequired,
    /** The content of the message */
    content: propTypes.string.isRequired,
    /** The sources of the message (Only available when the sender is "AI") */
    sources: propTypes.arrayOf(
        propTypes.shape({
            /** The id of the page where the sources are located */
            _id: propTypes.string.isRequired,
            /** The textual content of the page */
            content: propTypes.string.isRequired,
            /** The number of the page of that document */
            locationPage: propTypes.number.isRequired,
            /** Id of the document where the source can be found */
            document: propTypes.string.isRequired,
        })
    ),
};
