import TextField from "@/components/fields/TextField";
import { FieldStyles } from "./UserInfoForm.styles";
import { messages, api } from "@/utils/constants";
import propTypes from "./UserInfoForm.props";

/**
 * Component that renders the User Information form section in account related forms.
 * It asks for the user's first, middle, and last names.
 */
const UserInfoForm = ({ namesField, lastNamesField, isSubmitting }) => {
    return (
        <>
            <TextField
                fullWidth
                variant="standard"
                sx={FieldStyles}
                name="names"
                label={
                    messages.account.generalInfo.update.form.NAMES_FIELD_LABEL
                }
                value={namesField.value}
                onChange={namesField.onChange}
                helperText={
                    messages.account.generalInfo.update.form
                        .NAMES_FIELD_HELPER_TEXT
                }
                showHelperText
                disabled={isSubmitting}
                inputProps={{
                    minLength: api.validation.accounts.NAMES_MIN_LENGTH,
                    maxLength: api.validation.accounts.NAMES_MAX_LENGTH,
                }}
            />
            <TextField
                fullWidth
                variant="standard"
                name="lastnames"
                label={
                    messages.account.generalInfo.update.form
                        .LASTNAMES_FIELD_LABEL
                }
                value={lastNamesField.value}
                onChange={lastNamesField.onChange}
                helperText={
                    messages.account.generalInfo.update.form
                        .LASTNAMES_FIELD_HELPER_TEXT
                }
                showHelperText
                disabled={isSubmitting}
                inputProps={{
                    minLength: api.validation.accounts.LASTNAMES_MIN_LENGTH,
                    maxLength: api.validation.accounts.LASTNAMES_MAX_LENGTH,
                }}
            />
        </>
    );
};

UserInfoForm.propTypes = propTypes;

export default UserInfoForm;
