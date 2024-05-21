import { useMutation, useQueryClient } from "@tanstack/react-query";
import authAPI from "@/apis/auth/authAPI";
import authCookies from "@/utils/cookies/auth";
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

/** It creates and provides the state to logout a user. */
const useLogout = () => {
    const queryClient = useQueryClient();
    const queryState = useMutation({
        mutationFn: () => authAPI.logout(),
        onSuccess: () => {
            authCookies.removeAccessToken();
            const cancelValue = queryClient.cancelQueries();
            queryClient.clear();
            // Invalidate profile query
            queryClient.resetQueries({
                queryKey: profilesCache.profile(),
            });
            return cancelValue;
        },
        throwOnError: (error) => Boolean(error),
    });

    return queryState;
};

export default { useLogin, useLogout, useSignUp };
