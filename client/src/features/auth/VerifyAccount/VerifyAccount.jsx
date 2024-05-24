import { Link } from "react-router-dom";
import { useEffect } from "react";
import {
    Card,
    CardContent,
    CardMedia,
    CardHeader,
    Box,
    Link as MuiLink,
    Typography,
} from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import authServices from "@/services/auth";
import ShowLoader from "@/components/informational/ShowLoader";
import { messages, routes } from "@/utils/constants";
import {
    VerifyAccountCardStyles,
    VerifyAccountCardImgStyles,
    LoginLinkContainerStyles,
    LoginLinkStyles,
} from "./VerifyAccount.styles";
import propTypes from "./VerifyAccount.props";

/**
 * Renders the component that verifies a user account from a verification code.
 * And, on success, shows successful feedback to the user.
 */
const VerifyAccount = ({ verificationCode }) => {
    const verificationQuery = authServices.useVerifyAccount();

    // Trigger the mutation during component mount only once
    useEffect(() => {
        verificationQuery.mutate({ verificationCode });
    }, []);

    return (
        <ShowLoader isLoading={verificationQuery.isPending}>
            <Card sx={VerifyAccountCardStyles}>
                <CardMedia
                    sx={VerifyAccountCardImgStyles}
                    title="logo"
                    loading="lazy"
                >
                    <CheckCircleOutline fontSize="inherit" color="success" />
                </CardMedia>
                <CardHeader title={messages.auth.accountVerification.TITLE} />
                <CardContent>
                    <Typography>
                        {messages.auth.accountVerification.CONTENT}
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
        </ShowLoader>
    );
};

VerifyAccount.propTypes = propTypes;

export default VerifyAccount;
