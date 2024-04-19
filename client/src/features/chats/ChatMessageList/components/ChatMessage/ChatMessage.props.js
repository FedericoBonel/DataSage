import PropTypes from "prop-types";
import { ChatMessageDTO } from "@/dtos/chats";

export default { chatMessage: PropTypes.shape(ChatMessageDTO).isRequired };
