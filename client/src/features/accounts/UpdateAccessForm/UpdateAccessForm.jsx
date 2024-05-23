import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardActions } from "@mui/material";
import accountsServices from "@/services/accounts";
import Form from "@/components/forms/Form";
import FormAlert from "@/components/forms/FormAlert";
import ShowLoader from "@/components/informational/ShowLoader";
import UserAccessForm from "@/features/accounts/components/UserAccessForm";
import { accountsValidator } from "@/utils/validators";
import { messages, routes } from "@/utils/constants";
import { CardStyles } from "./UpdateAccessForm.styles";

/** Initial state of the form */
const initialFormState = {
    email: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
};

/** Component that renders the user access information update form. It currently allows changing email and password. */
const UpdateAccessForm = () => {
    const navigate = useNavigate();
    const [accessInfo, setAccessInfo] = useState(initialFormState);

    const accountQuery = accountsServices.useAccountData();
    useEffect(() => {
        if (accountQuery.isSuccess) {
            setAccessInfo((prev) => ({
                ...prev,
                email: accountQuery.data?.data.email,
            }));
        }
    }, [accountQuery.data, accountQuery.isSuccess]);

    const updateAccountQuery = accountsServices.useUpdateAccount();

    // Updates state when text fields changes
    const onChangeTextField = (e) =>
        setAccessInfo((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

    const resetForm = () => {
        updateAccountQuery.reset();
        setAccessInfo(
            accountQuery.isSuccess
                ? { ...initialFormState, email: accountQuery.data?.data.email }
                : initialFormState
        );
    };

    const onSubmit = (e) => {
        e.preventDefault();

        updateAccountQuery.mutate(
            {
                credentials: {
                    newEmail: accessInfo.email,
                    password: accessInfo.password,
                    newPassword: accessInfo.newPassword,
                },
            },
            {
                onSuccess: () =>
                    accessInfo.password &&
                    accessInfo.newPassword &&
                    navigate(`/${routes.auth.AUTH}/${routes.auth.LOGIN}`),
            }
        );
    };

    // If submition was unsuccessful show the corresponding errors
    const errors = updateAccountQuery.isError && (
        <FormAlert error={updateAccountQuery.error?.response?.data} />
    );

    return (
        <ShowLoader isLoading={accountQuery.isLoading}>
            <Form
                component={Card}
                buttonsWrapper={CardActions}
                sx={CardStyles}
                onSubmit={onSubmit}
                canSubmit={accountsValidator.updateAccess(accessInfo)}
                onCancel={resetForm}
                isSubmitting={updateAccountQuery.isPending}
                buttonsLabels={{
                    submit: messages.account.accessInfo.update.form.buttons.SUBMIT,
                    cancel: messages.account.accessInfo.update.form.buttons.CANCEL,
                }}
            >
                <CardHeader
                    title={messages.account.accessInfo.update.form.TITLE}
                    subheader={
                        messages.account.accessInfo.update.form.SUB_TITLE
                    }
                />
                <CardContent>
                    <UserAccessForm
                        askForCurrentPassword
                        isSubmitting={updateAccountQuery.isPending}
                        emailField={{
                            onChange: onChangeTextField,
                            value: accessInfo.email,
                        }}
                        currentPasswordField={{
                            onChange: onChangeTextField,
                            value: accessInfo.password,
                        }}
                        newPasswordField={{
                            onChange: onChangeTextField,
                            value: accessInfo.newPassword,
                        }}
                        confirmPasswordField={{
                            onChange: onChangeTextField,
                            value: accessInfo.confirmPassword,
                        }}
                    />
                </CardContent>
                {errors}
            </Form>
        </ShowLoader>
    );
};

export default UpdateAccessForm;
