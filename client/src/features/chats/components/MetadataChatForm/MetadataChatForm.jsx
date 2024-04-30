import TextField from "@/components/fields/TextField";
import { messages, api } from "@/utils/constants";
import propTypes from "./MetadataChatForm.props";

/**
 * Component that renders the metadata section in chat forms.
 * It asks for chat names.
 */
const FormChatMetadata = ({ nameField, isSubmitting }) => {
    return (
        <TextField
            value={nameField.value}
            variant="standard"
            label={messages.chats.formSections.metadata.NAME_FIELD_LABEL}
            inputProps={{
                required: true,
                maxLength: api.validation.chats.MAX_NAME_LENGTH,
            }}
            fullWidth
            name="name"
            onChange={nameField.onChange}
            showHelperText
            helperText={messages.chats.formSections.metadata.NAME_FIELD_HELPER}
            disabled={isSubmitting}
        />
    );
};

FormChatMetadata.propTypes = propTypes;

export default FormChatMetadata;
