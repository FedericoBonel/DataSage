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
import Form from "@/components/forms/Form";
import FormAlert from "@/components/forms/FormAlert";
import UserCredentialsForm from "@/features/auth/components/UserCredentialsForm";
import { authValidator } from "@/utils/validators";
import { routes, messages } from "@/utils/constants";
import {
    LoginFormContainerStyles,
    LoginFormImgStyles,
    SignUpLinkContainerStyles,
    SignUpLinkQuestionStyles,
    SignUpLinkStyles,
} from "./LoginForm.styles";

/** Initial state of the form */
const initialFormState = {
    email: "",
    password: "",
};

/** Renders the component that logs users to the application by email and password. */
const LoginForm = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState(initialFormState);

    const loginQuery = authServices.useLogin();

    const onChange = (e) =>
        setCredentials((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

    const onSubmit = (e) => {
        e.preventDefault();

        loginQuery.mutate(credentials, {
            onSuccess: () => navigate(`/${routes.HOME}`),
        });
    };

    // If submition was unsuccessful show the corresponding errors
    const errors = loginQuery.isError && (
        <FormAlert error={loginQuery.error?.response?.data} />
    );

    return (
        <Card sx={LoginFormContainerStyles}>
            <Form
                buttonsLabels={{ submit: messages.actions.decision.SIGNIN }}
                buttonsWrapper={CardActions}
                buttonsProps={{
                    submit: { fullWidth: true, variant: "contained" },
                }}
                onSubmit={onSubmit}
                canSubmit={authValidator.login(credentials)}
                isSubmitting={loginQuery.isPending}
            >
                <CardMedia
                    sx={LoginFormImgStyles}
                    image={Logo}
                    component="img"
                    title="logo"
                    loading="lazy"
                />
                <CardHeader
                    title={messages.auth.login.form.TITLE}
                    subheader={messages.auth.login.form.SUB_TITLE}
                />
                <CardContent>
                    <UserCredentialsForm
                        emailField={{ onChange, value: credentials.email }}
                        passwordField={{
                            onChange,
                            value: credentials.password,
                        }}
                        isSubmitting={loginQuery.isPending}
                    />
                </CardContent>
            </Form>
            {errors}
            <Box sx={SignUpLinkContainerStyles}>
                <MuiLink
                    variant="body2"
                    sx={SignUpLinkQuestionStyles}
                    component={Link}
                    to={`/${routes.auth.AUTH}/${routes.auth.RECOVER}`}
                >
                    {messages.auth.login.form.RECOVER_QUESTION}
                </MuiLink>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={SignUpLinkQuestionStyles}
                >
                    {messages.auth.login.form.SIGNUP_QUESTION}
                    <MuiLink
                        component={Link}
                        to={`/${routes.auth.AUTH}/${routes.auth.SIGNUP}`}
                        sx={SignUpLinkStyles}
                    >
                        {messages.actions.decision.SIGNUP}
                    </MuiLink>
                </Typography>
            </Box>
        </Card>
    );
};

export default LoginForm;
