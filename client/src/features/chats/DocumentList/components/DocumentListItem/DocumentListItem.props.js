import PropTypes from "prop-types";
import { ChatDocumentDTO } from "@/dtos/chats";

export default {
    /** Chat item to show */
    documentItem: PropTypes.shape(ChatDocumentDTO).isRequired,
    /** Function to be executed when a documents delete button is clicked. Receives the document's id as an argument. */
    onClickDelete: PropTypes.func.isRequired,
    /** True if the delete button should be shown, false otherwise. */
    showDelete: PropTypes.bool,
};
