import TextField from "@/components/fields/TextField";
import { messages } from "@/utils/constants";
import propTypes from "./UserAccessForm.props";
import { FieldStyles } from "./UserAccessForm.styles";

/**
 * Component that renders the User Access section in auth related forms.
 * It asks for user email, password and, optionally, confirm password fields.
 */
const UserAccessForm = ({ emailField, passwordField, isSubmitting }) => {
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
                helperText={emailField.helperText}
                disabled={isSubmitting}
                validator={emailField.validator}
            />
            <TextField
                fullWidth
                sx={
                    !passwordField.hideConfirmPassword ? FieldStyles : undefined
                }
                label={messages.auth.login.form.PASSWORD}
                type="password"
                name="password"
                onChange={passwordField.onChange}
                value={passwordField.value}
                helperText={passwordField.helperText}
                disabled={isSubmitting}
                validator={passwordField.validator}
            />
            {!passwordField.hideConfirmPassword && (
                <TextField
                    fullWidth
                    label={messages.auth.login.form.PASSWORD}
                    type="password"
                    name="confirmPassword"
                    onChange={passwordField.onChange}
                    value={passwordField.value}
                    helperText={passwordField.confirmHelperText}
                    disabled={isSubmitting}
                    validator={passwordField.confirmPasswordValidator}
                />
            )}
        </>
    );
};

UserAccessForm.propTypes = propTypes;

export default UserAccessForm;
