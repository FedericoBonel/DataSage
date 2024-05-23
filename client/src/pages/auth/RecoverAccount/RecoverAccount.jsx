import { Unstable_Grid2 as Grid } from "@mui/material";
import RecoverAccountForm from "@/features/auth/RecoverAccountForm";

/**
 * Renders the page that sends a recovery email to a user email address and provides feedback with
 * next steps to reset their password.
 */
const RecoverAccount = () => {
    return (
        <Grid
            container
            padding={4}
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <Grid>
                <RecoverAccountForm />
            </Grid>
        </Grid>
    );
};

export default RecoverAccount;
