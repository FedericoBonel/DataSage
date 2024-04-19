import PropTypes from "prop-types";
import { ChatMessageDTO } from "@/dtos/chats";

export default {
    /** Array of all the message pages to be rendered in the chat. */
    chatMessagePages: PropTypes.arrayOf(
        PropTypes.shape({
            data: PropTypes.arrayOf(PropTypes.shape(ChatMessageDTO)).isRequired,
        })
    ).isRequired,
    /** True if the AI is generating a response, false otherwise. */
    isResponding: PropTypes.bool
};
