import { Unstable_Grid2 as Grid } from "@mui/material";
import LoginForm from "@/features/auth/LoginForm";

/** Renders the application Login page */
const Login = () => {
    return (
        <Grid
            container
            padding={4}
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <Grid>
                <LoginForm />
            </Grid>
        </Grid>
    );
};

export default Login;
