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
} from "./VerificationSent.styles";

/** 
 * Renders the page that provides a user a successfull feedback when registering an account 
 * and informs them of next steps to follow to start using the account. 
 */
const VerificationSent = () => {
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
                    <CardHeader title={messages.auth.signupEmailSent.TITLE} />
                    <CardContent>
                        <Typography>
                            {messages.auth.signupEmailSent.CONTENT}
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
                            {messages.auth.signupEmailSent.SIGNIN_QUESTION}
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

export default VerificationSent;
