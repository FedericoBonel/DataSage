import { useSearchParams } from "react-router-dom";
import { Unstable_Grid2 as Grid } from "@mui/material";
import config from "@/config";
import VerifyAccount from "@/features/auth/VerifyAccount";

/**
 * Renders the page that verifies a user account and provides feedback with
 * next steps to start using their account.
 */
const Verification = () => {
    const [queryParams] = useSearchParams();
    const verificationCode = queryParams.get(config.api.VERIFICATION_CODE_KEY);

    return (
        <Grid
            container
            padding={4}
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <Grid>
                <VerifyAccount verificationCode={verificationCode} />
            </Grid>
        </Grid>
    );
};

export default Verification;
