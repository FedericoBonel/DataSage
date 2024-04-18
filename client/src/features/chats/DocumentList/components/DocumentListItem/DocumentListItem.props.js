import PropTypes from "prop-types";
import { ChatDocumentDTO } from "@/dtos/chats";

export default {
    /** Chat item to show */
    documentItem: PropTypes.shape(ChatDocumentDTO).isRequired,
};
