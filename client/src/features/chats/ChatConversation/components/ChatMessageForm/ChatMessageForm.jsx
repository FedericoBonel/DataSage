import { useState } from "react";
import { IconButton } from "@mui/material";
import { Send } from "@mui/icons-material";
import { TextField } from "@/components/fields";
import { messages, api } from "@/utils/constants";
import propTypes from "./ChatMessageForm.props";

/** Renders the form for sending chat messages and receives the callback to be called when user decides to send the message. */
const ChatMessageForm = ({ onSend, disabled }) => {
    const [message, setMessage] = useState("");

    const onPressSend = () => {
        onSend(message);
        setMessage("");
    };

    // Allow new lines on enter + shift
    const onKeyDown = (e) => {
        if (e.shiftKey && e.key === "Enter") {
            return;
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (message.length > 0) onPressSend();
        }
    };

    const onChange = (e) => {
        setMessage(e.target.value);
    };

    return (
        <TextField
            value={message}
            sx={{ margin: 1 }}
            multiline
            hiddenLabel
            label={messages.chats.messages.input.LABEL}
            placeholder={messages.chats.messages.input.PLACEHOLDER}
            minRows={1}
            maxRows={5}
            endElement={
                <IconButton
                    onClick={onPressSend}
                    disabled={disabled || message.length < 1}
                >
                    <Send />
                </IconButton>
            }
            onKeyDown={onKeyDown}
            onChange={onChange}
            disabled={disabled}
            inputProps={{
                maxLength: api.validation.messages.MESSAGE_MAX_LENGTH,
            }}
        />
    );
};

ChatMessageForm.propTypes = propTypes;

export default ChatMessageForm;
