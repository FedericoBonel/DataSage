import { Link } from "react-router-dom";
import {
    Unstable_Grid2 as Grid,
    Card,
    CardContent,
    CardMedia,
    CardHeader,
    Box,
    Link as MuiLink,
    Typography,
} from "@mui/material";
import Logo from "@/assets/logo.svg";
import { messages, routes } from "@/utils/constants";
import {
    SentEmailCardStyles,
    SentEmailCardImgStyles,
    LoginLinkContainerStyles,
    LoginLinkQuestionStyles,
    LoginLinkStyles,
} from "./RecoveryEmailSent.styles";

/**
 * Renders the page that provides feedback to a user that requested an account recovery email with next steps to follow
 */
const RecoveryEmailSent = () => {
    return (
        <Grid
            container
            padding={4}
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <Grid>
                <Card sx={SentEmailCardStyles}>
                    <CardMedia
                        sx={SentEmailCardImgStyles}
                        image={Logo}
                        component="img"
                        title="logo"
                        loading="lazy"
                    />
                    <CardHeader
                        title={messages.auth.accountRecoveryEmailSent.TITLE}
                    />
                    <CardContent>
                        <Typography sx={{ whiteSpace: "pre-wrap" }}>
                            {messages.auth.accountRecoveryEmailSent.CONTENT}
                        </Typography>
                    </CardContent>
                    <Box
                        textAlign="center"
                        flexDirection="column"
                        display="flex"
                        sx={LoginLinkContainerStyles}
                    >
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={LoginLinkQuestionStyles}
                        >
                            {
                                messages.auth.accountRecoveryEmailSent
                                    .SIGNIN_QUESTION
                            }
                            <MuiLink
                                component={Link}
                                to={`/${routes.auth.AUTH}/${routes.auth.LOGIN}`}
                                sx={LoginLinkStyles}
                            >
                                {messages.actions.decision.SIGNIN}
                            </MuiLink>
                        </Typography>
                    </Box>
                </Card>
            </Grid>
        </Grid>
    );
};

export default RecoveryEmailSent;
