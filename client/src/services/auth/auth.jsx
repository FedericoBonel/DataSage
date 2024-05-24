import { useMutation, useQueryClient } from "@tanstack/react-query";
import authAPI from "@/apis/auth/authAPI";
import authCookies from "@/utils/cookies/auth";
import useLogoutContext from "@/utils/hooks/useLogout";
import profilesCache from "../caches/profiles";

/** It creates and provides the state to login a user. */
const useLogin = () => {
    const queryClient = useQueryClient();
    const queryState = useMutation({
        mutationFn: ({ email, password }) => authAPI.login({ email, password }),
        onSuccess: (response) => {
            authCookies.setAccessToken(response?.data?.token);
            // Invalidate profile query
            queryClient.invalidateQueries({
                queryKey: profilesCache.profile(),
            });
        },
        throwOnError: (error) =>
            error?.response?.status !== 401 && error?.response?.status !== 400,
    });

    return queryState;
};

/** It creates and provides the state to sign up a new user in the application. */
const useSignUp = () => {
    const queryState = useMutation({
        mutationFn: ({ email, password, names, lastnames }) =>
            authAPI.signUp({ email, password, names, lastnames }),
        throwOnError: (error) => error?.response?.status !== 400,
    });

    return queryState;
};

/** It creates and provides the state to verify a user's account in the application. */
const useVerifyAccount = () => {
    const queryState = useMutation({
        mutationFn: ({ verificationCode }) =>
            authAPI.verifyAccount({ verificationCode }),
        throwOnError: (error) => Boolean(error),
    });

    return queryState;
};

/** It creates and provides the state to send a recovery email to a user email to reset their password. */
const useRecoverAccount = () => {
    const queryState = useMutation({
        mutationFn: ({ email }) => authAPI.recoverAccount({ email }),
        throwOnError: (error) => Boolean(error),
    });

    return queryState;
};

/** It creates and provides the state to reset a user password by recovery code. */
const useResetPassword = () => {
    const queryState = useMutation({
        mutationFn: ({ password, recoveryCode }) =>
            authAPI.resetPassword({ password }, recoveryCode),
        throwOnError: (error) =>
            error?.response?.status !== 400 && error?.response?.status !== 404,
    });

    return queryState;
};

/** It creates and provides the state to logout a user. */
const useLogout = () => {
    const logout = useLogoutContext();
    const queryState = useMutation({
        mutationFn: () => authAPI.logout(),
        onSuccess: () => logout(),
        throwOnError: (error) => Boolean(error),
    });

    return queryState;
};

export default {
    useLogin,
    useLogout,
    useSignUp,
    useVerifyAccount,
    useRecoverAccount,
    useResetPassword,
};
