import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardActions } from "@mui/material";
import accountsServices from "@/services/accounts";
import Form from "@/components/forms/Form";
import FormAlert from "@/components/forms/FormAlert";
import ShowLoader from "@/components/informational/ShowLoader";
import UserInfoForm from "@/features/accounts/components/UserInfoForm";
import { accountsValidator } from "@/utils/validators";
import { messages } from "@/utils/constants";

/** Initial state of the form */
const initialFormState = {
    names: "",
    lastnames: "",
};

/** Component that renders the user information update form. It currently allows changing names and lastnames. */
const UpdateUserInfoForm = () => {
    const [userInfo, setUserInfo] = useState(initialFormState);

    const accountQuery = accountsServices.useAccountData();
    useEffect(() => {
        if (accountQuery.isSuccess) {
            setUserInfo({
                names: accountQuery.data?.data.names,
                lastnames: accountQuery.data?.data.lastnames,
            });
        }
    }, [accountQuery.data, accountQuery.isSuccess]);

    const updateAccountQuery = accountsServices.useUpdateAccount();

    // Updates state when text fields changes
    const onChangeTextField = (e) =>
        setUserInfo((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

    const resetForm = () => {
        updateAccountQuery.reset();
        setUserInfo(
            accountQuery.isSuccess
                ? {
                      names: accountQuery.data?.data.names,
                      lastnames: accountQuery.data?.data.lastnames,
                  }
                : initialFormState
        );
    };

    const onSubmit = (e) => {
        e.preventDefault();

        updateAccountQuery.mutate(userInfo);
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
                sx={{ flex: 1 }}
                onSubmit={onSubmit}
                canSubmit={accountsValidator.updateUserInfo(userInfo)}
                onCancel={resetForm}
                isSubmitting={updateAccountQuery.isPending}
                buttonsLabels={{
                    submit: messages.account.generalInfo.update.form.buttons.SUBMIT,
                    cancel: messages.account.generalInfo.update.form.buttons.CANCEL,
                }}
            >
                <CardHeader
                    title={messages.account.generalInfo.update.form.TITLE}
                    subheader={
                        messages.account.generalInfo.update.form.SUB_TITLE
                    }
                />
                <CardContent>
                    <UserInfoForm
                        namesField={{
                            onChange: onChangeTextField,
                            value: userInfo.names,
                        }}
                        lastNamesField={{
                            onChange: onChangeTextField,
                            value: userInfo.lastnames,
                        }}
                        isSubmitting={updateAccountQuery.isPending}
                    />
                </CardContent>
                {errors}
            </Form>
        </ShowLoader>
    );
};

export default UpdateUserInfoForm;
