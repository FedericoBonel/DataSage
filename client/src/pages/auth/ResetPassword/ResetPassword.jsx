import { useSearchParams } from "react-router-dom";
import { Unstable_Grid2 as Grid } from "@mui/material";
import config from "@/config";
import ResetPasswordForm from "@/features/auth/ResetPasswordForm";

/**
 * Renders the page that allows a user to reset their password from a recovery code.
 */
const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const recoveryCode = searchParams.get(config.api.RECOVERY_CODE_KEY);

    return (
        <Grid
            container
            padding={4}
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <Grid>
                <ResetPasswordForm recoveryCode={recoveryCode} />
            </Grid>
        </Grid>
    );
};

export default ResetPassword;
