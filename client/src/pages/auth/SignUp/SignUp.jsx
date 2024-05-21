import { Unstable_Grid2 as Grid } from "@mui/material";
import SignUpForm from "@/features/auth/SignUpForm";

/** Renders the page that allows users to sign up to the system to start using it. */
const SignUp = () => {
    return (
        <Grid
            container
            padding={4}
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <Grid>
                <SignUpForm />
            </Grid>
        </Grid>
    );
};

export default SignUp;
