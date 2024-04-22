import PropTypes from "prop-types";
import { ChatListDTO } from "@/dtos/chats";

export default {
    /** Chat item to show */
    chatItem: PropTypes.shape(ChatListDTO).isRequired,
    /** True if the item is selected. If so, it will be highlighted. */
    selected: PropTypes.bool,
};
