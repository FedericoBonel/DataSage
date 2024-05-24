import { Box } from "@mui/material";
import TextField from "@/components/fields/TextField";
import { api, messages } from "@/utils/constants";
import { accountsValidator } from "@/utils/validators";
import propTypes from "./UserAccessForm.props";
import { FieldStyles, PasswordFieldsStyles } from "./UserAccessForm.styles";

/**
 * Component that renders the User Access section in profile related forms for registration or update.
 * It asks for a user new password, confirm password and, optionally, current password and email.
 */
const UserAccessForm = ({
    emailField,
    currentPasswordField,
    newPasswordField,
    confirmPasswordField,
    isSubmitting,
    askForCurrentPassword,
    askForEmail = true,
}) => {
    return (
        <>
            {askForCurrentPassword && (
                // Current password
                <TextField
                    fullWidth
                    showHelperText
                    sx={FieldStyles}
                    label={
                        messages.account.accessInfo.update.form.CURRENT_PASSWORD
                    }
                    type="password"
                    name="password"
                    onChange={currentPasswordField.onChange}
                    value={currentPasswordField.value}
                    helperText={
                        messages.account.accessInfo.update.form
                            .CURRENT_PASSWORD_HELPER_TEXT
                    }
                    disabled={isSubmitting}
                    inputProps={{
                        minLength: api.validation.auth.PASS_MIN_LENGTH,
                        maxLength: api.validation.auth.PASS_MAX_LENGTH,
                    }}
                    validator={accountsValidator.isStrongPass}
                    required={true}
                    variant="standard"
                />
            )}
            <Box sx={askForCurrentPassword ? PasswordFieldsStyles : undefined}>
                {/* The new email */}
                {askForEmail && (
                    <TextField
                        fullWidth
                        showHelperText
                        sx={FieldStyles}
                        label={messages.account.accessInfo.update.form.EMAIL}
                        type="email"
                        name="email"
                        onChange={emailField.onChange}
                        value={emailField.value}
                        helperText={
                            messages.account.accessInfo.update.form
                                .EMAIL_HELPER_TEXT
                        }
                        disabled={isSubmitting}
                        inputProps={{
                            minLength: api.validation.auth.EMAIL_MIN_LENGTH,
                            maxLength: api.validation.auth.EMAIL_MAX_LENGTH,
                        }}
                        variant="standard"
                        validator={accountsValidator.isEmail}
                    />
                )}
                {/* The new password */}
                <TextField
                    fullWidth
                    showHelperText
                    sx={FieldStyles}
                    label={messages.account.accessInfo.update.form.NEW_PASSWORD}
                    type="password"
                    name="newPassword"
                    onChange={newPasswordField.onChange}
                    value={newPasswordField.value}
                    helperText={
                        messages.account.accessInfo.update.form
                            .NEW_PASSWORD_HELPER_TEXT
                    }
                    disabled={isSubmitting}
                    inputProps={{
                        minLength: api.validation.auth.PASS_MIN_LENGTH,
                        maxLength: api.validation.auth.PASS_MAX_LENGTH,
                    }}
                    validator={accountsValidator.isStrongPass}
                    variant="standard"
                />
                {/* The new password confirmation */}
                <TextField
                    fullWidth
                    showHelperText
                    label={
                        messages.account.accessInfo.update.form
                            .CONFIRM_NEW_PASSWORD
                    }
                    type="password"
                    name="confirmPassword"
                    onChange={confirmPasswordField.onChange}
                    value={confirmPasswordField.value}
                    helperText={
                        messages.account.accessInfo.update.form
                            .CONFIRM_NEW_PASSWORD_HELPER_TEXT
                    }
                    disabled={isSubmitting}
                    inputProps={{
                        minLength: api.validation.auth.PASS_MIN_LENGTH,
                        maxLength: api.validation.auth.PASS_MAX_LENGTH,
                    }}
                    validator={(val) =>
                        accountsValidator.isStrongPass(val) &&
                        newPasswordField.value === val
                    }
                    variant="standard"
                />
            </Box>
        </>
    );
};

UserAccessForm.propTypes = propTypes;

export default UserAccessForm;
