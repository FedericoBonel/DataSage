import { TextField } from "@/components/fields";
import { messages } from "@/utils/constants";
import propTypes from "./ParticipantContactForm.props";

/**
 * Component that renders the participant contact section in participant forms.
 * It asks for the participant email.
 */
const ParticipantContactForm = ({ emailField, isSubmitting }) => {
    return (
        <TextField
            fullWidth
            type="email"
            name="email"
            variant="standard"
            label={messages.chats.participants.formSections.contact.EMAIL}
            value={emailField.value}
            onChange={emailField.onChange}
            autoComplete="off"
            disabled={isSubmitting}
        />
    );
};

ParticipantContactForm.propTypes = propTypes;

export default ParticipantContactForm;
