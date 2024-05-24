import TextField from "@/components/fields/TextField";
import { api, messages } from "@/utils/constants";
import propTypes from "./UserCredentialsForm.props";
import { FieldStyles } from "./UserCredentialsForm.styles";

/**
 * Component that renders the Authentication and Authorization user credentials section in auth related forms.
 * It asks for user email and password fields.
 */
const UserCredentialsForm = ({ emailField, passwordField, isSubmitting }) => {
    return (
        <>
            <TextField
                fullWidth
                sx={FieldStyles}
                label={messages.auth.login.form.EMAIL}
                type="email"
                name="email"
                onChange={emailField.onChange}
                value={emailField.value}
                disabled={isSubmitting}
                inputProps={{
                    minLength: api.validation.auth.EMAIL_MIN_LENGTH,
                    maxLength: api.validation.auth.EMAIL_MAX_LENGTH,
                }}
            />
            <TextField
                fullWidth
                label={messages.auth.login.form.PASSWORD}
                type="password"
                name="password"
                onChange={passwordField.onChange}
                value={passwordField.value}
                disabled={isSubmitting}
                inputProps={{
                    minLength: api.validation.auth.PASS_MIN_LENGTH,
                    maxLength: api.validation.auth.PASS_MAX_LENGTH,
                }}
            />
        </>
    );
};

UserCredentialsForm.propTypes = propTypes;

export default UserCredentialsForm;
