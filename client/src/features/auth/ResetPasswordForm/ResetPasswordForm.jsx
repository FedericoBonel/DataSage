import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    CardMedia,
    Typography,
    Box,
    Link as MuiLink,
} from "@mui/material";
import Logo from "@/assets/logo.svg";
import authServices from "@/services/auth";
import UserAccessForm from "@/features/accounts/components/UserAccessForm";
import Form from "@/components/forms/Form";
import FormAlert from "@/components/forms/FormAlert";
import { authValidator } from "@/utils/validators";
import { routes, messages } from "@/utils/constants";
import {
    ResetFormContainerStyles,
    ResetFormImgStyles,
    SignInLinkContainerStyles,
    SignInLinkQuestionStyles,
    SignInLinkStyles,
} from "./ResetPasswordForm.styles";
import propTypes from "./ResetPasswordForm.props";

const initialState = {
    newPassword: "",
    confirmPassword: "",
};

/** Renders the component that allows a user to reset their password from a recovery code. */
const ResetPasswordForm = ({ recoveryCode }) => {
    const navigate = useNavigate();
    const [password, setPassword] = useState(initialState);

    const resetQuery = authServices.useResetPassword();

    const onChange = (e) =>
        setPassword((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const onSubmit = (e) => {
        e.preventDefault();

        resetQuery.mutate(
            { password: password.newPassword, recoveryCode },
            {
                onSuccess: () => navigate(`${routes.auth.DONE}`),
                onError: (error) =>
                    error?.response?.status === 404 &&
                    setPassword(initialState),
            }
        );
    };

    // If submition was unsuccessful show the corresponding errors
    const errors = resetQuery.isError &&
        resetQuery.error?.response?.status === 400 && (
            <FormAlert error={resetQuery.error?.response?.data} />
        );
    const showCodeExpired =
        resetQuery.isError && resetQuery.error?.response?.status === 404;

    return (
        <Card sx={ResetFormContainerStyles}>
            <Form
                buttonsLabels={{ submit: messages.actions.decision.SUBMIT }}
                buttonsWrapper={CardActions}
                buttonsProps={{
                    submit: { fullWidth: true, variant: "contained" },
                }}
                onSubmit={onSubmit}
                canSubmit={authValidator.resetPassword(password)}
                isSubmitting={resetQuery.isPending}
            >
                <CardMedia
                    sx={ResetFormImgStyles}
                    image={Logo}
                    component="img"
                    title="logo"
                    loading="lazy"
                />
                <CardHeader
                    title={messages.auth.resetPassword.TITLE}
                    subheader={
                        showCodeExpired
                            ? messages.auth.resetPassword.CODE_EXPIRED
                            : messages.auth.resetPassword.SUB_TITLE
                    }
                />
                <CardContent>
                    {!showCodeExpired && (
                        <UserAccessForm
                            newPasswordField={{
                                onChange,
                                value: password.newPassword,
                            }}
                            confirmPasswordField={{
                                onChange,
                                value: password.confirmPassword,
                            }}
                            isSubmitting={resetQuery.isPending}
                            askForEmail={false}
                        />
                    )}
                </CardContent>
            </Form>
            {errors}
            <Box sx={SignInLinkContainerStyles}>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={SignInLinkQuestionStyles}
                >
                    {messages.auth.resetPassword.SIGNIN_QUESTION}
                    <MuiLink
                        component={Link}
                        to={`/${routes.auth.AUTH}/${routes.auth.LOGIN}`}
                        sx={SignInLinkStyles}
                    >
                        {messages.actions.decision.SIGNIN}
                    </MuiLink>
                </Typography>
            </Box>
        </Card>
    );
};

ResetPasswordForm.propTypes = propTypes;

export default ResetPasswordForm;
