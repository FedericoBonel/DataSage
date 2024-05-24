import { Link } from "react-router-dom";
import {
    Card,
    CardContent,
    CardMedia,
    CardHeader,
    Box,
    Link as MuiLink,
    Typography,
    Unstable_Grid2 as Grid,
} from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import { messages, routes } from "@/utils/constants";
import {
    PasswordDoneCardStyles,
    PasswordDoneImgStyles,
    LoginLinkContainerStyles,
    LoginLinkStyles,
} from "./ResetPasswordDone.styles";

/**
 * Renders the page that gives the confirmation feedback to a user after reseting their password
 * and tells them what next steps they need to follow to sign in into their account.
 */
const ResetPasswordDone = () => {
    return (
        <Grid
            container
            padding={4}
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <Grid>
                <Card sx={PasswordDoneCardStyles}>
                    <CardMedia
                        sx={PasswordDoneImgStyles}
                        title="logo"
                        loading="lazy"
                    >
                        <CheckCircleOutline
                            fontSize="inherit"
                            color="success"
                        />
                    </CardMedia>
                    <CardHeader
                        title={messages.auth.resetPasswordDone.TITLE}
                    />
                    <CardContent>
                        <Typography>
                            {messages.auth.resetPasswordDone.CONTENT}
                        </Typography>
                    </CardContent>
                    <Box
                        textAlign="center"
                        flexDirection="column"
                        display="flex"
                        sx={LoginLinkContainerStyles}
                    >
                        <MuiLink
                            component={Link}
                            to={`/${routes.auth.AUTH}/${routes.auth.LOGIN}`}
                            sx={LoginLinkStyles}
                        >
                            {messages.actions.decision.SIGNIN}
                        </MuiLink>
                    </Box>
                </Card>
            </Grid>
        </Grid>
    );
};

export default ResetPasswordDone;
