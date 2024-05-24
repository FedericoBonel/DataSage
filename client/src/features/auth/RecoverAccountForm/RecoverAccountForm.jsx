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
import TextField from "@/components/fields/TextField";
import { authValidator } from "@/utils/validators";
import { routes, messages, api } from "@/utils/constants";
import {
    RecoverFormContainerStyles,
    RecoverFormImgStyles,
    SignInLinkContainerStyles,
    SignInLinkQuestionStyles,
    SignInLinkStyles,
} from "./RecoverAccountForm.styles";

/** Renders the component that allows a user send a recovery email to their email address. */
const RecoverAccountForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const recoverQuery = authServices.useRecoverAccount();

    const onChange = (e) => setEmail(e.target.value);

    const onSubmit = (e) => {
        e.preventDefault();

        recoverQuery.mutate(
            { email },
            {
                onSuccess: () => navigate(`${routes.auth.SENT}`),
            }
        );
    };

    // If submition was unsuccessful show the corresponding errors
    const errors = recoverQuery.isError && (
        <FormAlert error={recoverQuery.error?.response?.data} />
    );

    return (
        <Card sx={RecoverFormContainerStyles}>
            <Form
                buttonsLabels={{ submit: messages.actions.decision.RECOVER }}
                buttonsWrapper={CardActions}
                buttonsProps={{
                    submit: { fullWidth: true, variant: "contained" },
                }}
                onSubmit={onSubmit}
                canSubmit={authValidator.recovery(email)}
                isSubmitting={recoverQuery.isPending}
            >
                <CardMedia
                    sx={RecoverFormImgStyles}
                    image={Logo}
                    component="img"
                    title="logo"
                    loading="lazy"
                />
                <CardHeader
                    title={messages.auth.accountRecovery.form.TITLE}
                    subheader={messages.auth.accountRecovery.form.SUB_TITLE}
                />
                <CardContent>
                    <TextField
                        fullWidth
                        showHelperText
                        label={messages.auth.accountRecovery.form.EMAIL}
                        type="email"
                        name="email"
                        onChange={onChange}
                        value={email}
                        disabled={recoverQuery.isPending}
                        inputProps={{
                            minLength: api.validation.auth.EMAIL_MIN_LENGTH,
                            maxLength: api.validation.auth.EMAIL_MAX_LENGTH,
                        }}
                        validator={authValidator.recovery}
                        helperText={
                            messages.auth.accountRecovery.form.EMAIL_HELPER_TEXT
                        }
                    />
                </CardContent>
            </Form>
            {errors}
            <Box sx={SignInLinkContainerStyles}>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={SignInLinkQuestionStyles}
                >
                    {messages.auth.accountRecovery.form.SIGNIN_QUESTION}
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

export default RecoverAccountForm;
