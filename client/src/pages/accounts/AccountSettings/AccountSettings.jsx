import { Unstable_Grid2 as Grid, Typography } from "@mui/material";
import UpdateUserInfoForm from "@/features/accounts/UpdateUserInfoForm";
import { messages } from "@/utils/constants";
import { AccountSettingsPageStyles } from "./AccountSettings.styles";

/** Renders the account management and settings page */
const AccountSettings = () => {
    return (
        <Grid sx={AccountSettingsPageStyles} container rowSpacing={4}>
            <Grid sm={12}>
                <Typography component="h1" variant="h3">
                    {messages.account.settings.PAGE_TITLE}
                </Typography>
            </Grid>
            <Grid sm={12}>
                <UpdateUserInfoForm />
            </Grid>
        </Grid>
    );
};

export default AccountSettings;
