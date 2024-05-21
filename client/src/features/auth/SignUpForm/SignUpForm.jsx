import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
    Card,
    CardContent,
    CardActions,
    CardMedia,
    CardHeader,
    Box,
    Link as MuiLink,
    Typography,
} from "@mui/material";
import Logo from "@/assets/logo.svg";
import Form from "@/components/forms/Form";
import FormAlert from "@/components/forms/FormAlert";
import authServices from "@/services/auth";
import UserInfoForm from "@/features/accounts/components/UserInfoForm";
import UserAccessForm from "@/features/accounts/components/UserAccessForm";
import { authValidator } from "@/utils/validators";
import { routes, messages } from "@/utils/constants";
import {
    SignUpFormContainerStyles,
    SignUpFormImgStyles,
    LoginLinkContainerStyles,
    LoginLinkQuestionStyles,
    LoginLinkStyles,
} from "./SignUpForm.styles";

/** Initial state of the form */
const initialFormState = {
    names: "",
    lastnames: "",
    email: "",
    newPassword: "",
    confirmPassword: "",
};

/** Renders the component that allows users to sign up to the application and register their account. */
const SignUpForm = () => {
    const navigate = useNavigate();
    const [newAccount, setNewAccount] = useState(initialFormState);

    const signUpQuery = authServices.useSignUp();

    const onChange = (e) =>
        setNewAccount((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

    const onSubmit = (e) => {
        e.preventDefault();

        const { newPassword, ...formattedNewAccount } = newAccount;

        signUpQuery.mutate(
            { ...formattedNewAccount, password: newPassword },
            {
                onSuccess: () => navigate(routes.auth.SENT),
            }
        );
    };

    // If submition was unsuccessful show the corresponding errors
    const errors = signUpQuery.isError && (
        <FormAlert error={signUpQuery.error?.response?.data} />
    );

    return (
        <Card sx={SignUpFormContainerStyles}>
            <Form
                buttonsLabels={{ submit: messages.actions.decision.SIGNUP }}
                buttonsWrapper={CardActions}
                buttonsProps={{
                    submit: { fullWidth: true, variant: "contained" },
                }}
                onSubmit={onSubmit}
                canSubmit={authValidator.signup(newAccount)}
                isSubmitting={signUpQuery.isPending}
            >
                <CardMedia
                    sx={SignUpFormImgStyles}
                    image={Logo}
                    component="img"
                    title="logo"
                    loading="lazy"
                />
                <CardHeader
                    title={messages.auth.signup.form.TITLE}
                    subheader={messages.auth.signup.form.SUB_TITLE}
                />
                <CardContent>
                    <UserInfoForm
                        namesField={{ onChange, value: newAccount.names }}
                        lastNamesField={{
                            onChange,
                            value: newAccount.lastnames,
                        }}
                        isSubmitting={signUpQuery.isPending}
                    />
                    <UserAccessForm
                        emailField={{ onChange, value: newAccount.email }}
                        newPasswordField={{
                            onChange,
                            value: newAccount.newPassword,
                        }}
                        confirmPasswordField={{
                            onChange,
                            value: newAccount.confirmPassword,
                        }}
                    />
                </CardContent>
            </Form>
            {errors}
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
                    {messages.auth.signup.form.SIGNIN_QUESTION}
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
    );
};

export default SignUpForm;
